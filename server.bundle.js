/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(2);

	var _reactRouter = __webpack_require__(3);

	var _path = __webpack_require__(4);

	var _path2 = _interopRequireDefault(_path);

	var _Routes = __webpack_require__(5);

	var _Routes2 = _interopRequireDefault(_Routes);

	var _express = __webpack_require__(12);

	var _express2 = _interopRequireDefault(_express);

	var _request = __webpack_require__(13);

	var _request2 = _interopRequireDefault(_request);

	var _fs = __webpack_require__(14);

	var _fs2 = _interopRequireDefault(_fs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


	var API_URL = 'https://public-api.wordpress.com/rest/v1.1/sites/jonasniederstadt.wordpress.com';
	var mainJSON = _path2.default.resolve(__dirname, 'server/main.json');
	var siteBody = JSON.parse(_fs2.default.readFileSync(mainJSON));

	var app = (0, _express2.default)();

	app.set('view engine', 'ejs');
	app.set('views', './server/views');

	app.use('/js', _express2.default.static(_path2.default.resolve(__dirname, 'public/js')));
	app.use('/css', _express2.default.static(_path2.default.resolve(__dirname, 'public/css')));

	/**
	 * Data Provider class
	 */

	var DataProvider = function (_Component) {
	    _inherits(DataProvider, _Component);

	    function DataProvider() {
	        _classCallCheck(this, DataProvider);

	        return _possibleConstructorReturn(this, (DataProvider.__proto__ || Object.getPrototypeOf(DataProvider)).apply(this, arguments));
	    }

	    _createClass(DataProvider, [{
	        key: 'getChildContext',
	        value: function getChildContext() {
	            return {
	                data: this.props.data
	            };
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(_reactRouter.RouterContext, this.props);
	        }
	    }]);

	    return DataProvider;
	}(_react.Component);

	DataProvider.propTypes = {
	    data: _react2.default.PropTypes.object
	};

	DataProvider.childContextTypes = {
	    data: _react2.default.PropTypes.object
	};

	// getting the basic information about the site initially:
	app.use(function (req, res, next) {
	    var nextAfterLoading = true;

	    if (siteBody.name !== undefined) {
	        nextAfterLoading = false;
	        next();
	    }

	    (0, _request2.default)(API_URL, function (requestError, response, body) {
	        siteBody = JSON.parse(body);
	        var bodyString = body;

	        _fs2.default.writeFile(mainJSON, bodyString, function (err) {
	            if (err) throw err;

	            console.log('new main.js is saved locally...'); // eslint-disable-line
	        });

	        if (nextAfterLoading === true) {
	            next();
	        }
	    });
	});

	app.get('*', function (req, res) {
	    (0, _reactRouter.match)({
	        routes: _Routes2.default,
	        location: req.url
	    }, function (error, redirectLocation, renderProps) {
	        if (error) {
	            res.status(500).send(error.message);
	        } else if (redirectLocation) {
	            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	        } else if (renderProps) {
	            var requestUrl = API_URL + '/posts';

	            if (renderProps.params && renderProps.params.slug) {
	                requestUrl = requestUrl + '/slug:' + renderProps.params.slug;
	            }

	            // posts:
	            (0, _request2.default)(requestUrl, function (requestError, response, body) {
	                if (!requestError && response.statusCode == 200) {
	                    var bodyData = JSON.parse(body);

	                    var data = bodyData.posts ? {
	                        posts: bodyData.posts
	                    } : {
	                        post: bodyData
	                    };

	                    var _app = (0, _server.renderToString)(_react2.default.createElement(DataProvider, _extends({ data: data }, renderProps)));

	                    res.status(200).render('index', {
	                        userData: JSON.stringify(siteBody),
	                        title: siteBody.name + ' - ' + siteBody.description,
	                        // posts    : JSON.stringify( data.posts ),
	                        app: _app
	                    });
	                }
	                if (requestError) {
	                    res.status(500).send('Error: Data could not be loaded.');
	                }
	            });
	        } else {
	            res.status(404).send('Not found');
	        }
	    });
	});

	app.listen(3000, function () {
	    console.log('Example app listening on port 3000!'); // eslint-disable-line
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	var _Index = __webpack_require__(6);

	var _Index2 = _interopRequireDefault(_Index);

	var _Home = __webpack_require__(8);

	var _Home2 = _interopRequireDefault(_Home);

	var _Test = __webpack_require__(11);

	var _Test2 = _interopRequireDefault(_Test);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/', component: _Index2.default },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: '/:slug', component: _Test2.default })
	);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import './404.scss';


	// fetch polyfill

	var API_URL = 'https://public-api.wordpress.com/rest/v1.1/sites/18060805/posts';

	var Index = function (_React$Component) {
	    _inherits(Index, _React$Component);

	    function Index() {
	        _classCallCheck(this, Index);

	        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));

	        _this.state = _this.context.data || {
	            posts: [],
	            post: {}
	        };
	        return _this;
	    }

	    _createClass(Index, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.fetchPosts(this.props.params.slug);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            if (window && this.props.params.slug !== nextProps.params.slug) {
	                this.fetchPosts(nextProps.params.slug);
	            }
	        }
	        /**
	         *  fetch posts
	         *
	         *  fetches data from the api and sets the state
	         *
	         *  @param {String} slug - the slug of the post
	         *
	         */

	    }, {
	        key: 'fetchPosts',
	        value: function fetchPosts(slug) {
	            var _this2 = this;

	            var url = slug ? API_URL + '/slug:' + slug : API_URL;
	            window.fetch(url).then(function (res) {
	                return res.json();
	            }).then(function (data) {
	                if (Array.isArray(data.posts)) {
	                    _this2.setState({
	                        posts: data.posts,
	                        post: {}
	                    });
	                } else {
	                    _this2.setState({
	                        posts: [],
	                        post: data
	                    });
	                }
	            }).catch(function (err) {
	                console.error(err);
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            return _react2.default.createElement(
	                'div',
	                { className: 'Index' },
	                _react2.default.Children.map(this.props.children, function (child) {
	                    return _react2.default.cloneElement(child, _this3.state);
	                })
	            );
	        }
	    }]);

	    return Index;
	}(_react2.default.Component);

	Index.propTypes = {
	    children: _react2.default.PropTypes.object,
	    params: _react2.default.PropTypes.object
	};
	Index.contextTypes = {
	    data: _react2.default.PropTypes.object
	};

	exports.default = Index;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("whatwg-fetch");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Posts = __webpack_require__(9);

	var _Posts2 = _interopRequireDefault(_Posts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import './404.scss';

	// import { Link } from 'react-router';


	var Home = function (_React$Component) {
	    _inherits(Home, _React$Component);

	    function Home() {
	        _classCallCheck(this, Home);

	        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
	    }

	    _createClass(Home, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'Home' },
	                _react2.default.createElement(_Posts2.default, { posts: this.props.posts })
	            );
	        }
	    }]);

	    return Home;
	}(_react2.default.Component);

	Home.propTypes = {
	    posts: _react2.default.PropTypes.array,
	    post: _react2.default.PropTypes.object
	};

	exports.default = Home;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Post = __webpack_require__(10);

	var _Post2 = _interopRequireDefault(_Post);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Posts = function (_React$Component) {
	    _inherits(Posts, _React$Component);

	    function Posts() {
	        _classCallCheck(this, Posts);

	        return _possibleConstructorReturn(this, (Posts.__proto__ || Object.getPrototypeOf(Posts)).apply(this, arguments));
	    }

	    _createClass(Posts, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'Posts' },
	                this.props.posts.map(function (post) {
	                    var key = 'post-' + post.ID;

	                    return _react2.default.createElement(_Post2.default, { post: post, key: key });
	                })
	            );
	        }
	    }]);

	    return Posts;
	}(_react2.default.Component);

	Posts.propTypes = {
	    posts: _react2.default.PropTypes.array
	};

	exports.default = Posts;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Post = function (_React$Component) {
	    _inherits(Post, _React$Component);

	    function Post() {
	        _classCallCheck(this, Post);

	        return _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).apply(this, arguments));
	    }

	    _createClass(Post, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'Post' },
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: '/' + this.props.post.slug },
	                    this.props.post.title
	                )
	            );
	        }
	    }]);

	    return Post;
	}(_react2.default.Component);

	Post.propTypes = {
	    post: _react2.default.PropTypes.object
	};

	exports.default = Post;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import './404.scss';


	var Test = function (_React$Component) {
	    _inherits(Test, _React$Component);

	    function Test() {
	        _classCallCheck(this, Test);

	        return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
	    }

	    _createClass(Test, [{
	        key: 'getContent',
	        value: function getContent() {
	            return {
	                __html: this.props.post.content
	            };
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'Test' },
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: '/' },
	                    this.props.post.title
	                ),
	                _react2.default.createElement('div', { className: 'Test-content', dangerouslySetInnerHTML: this.getContent() })
	            );
	        }
	    }]);

	    return Test;
	}(_react2.default.Component);

	Test.propTypes = {
	    post: _react2.default.PropTypes.object
	};

	exports.default = Test;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ }
/******/ ]);