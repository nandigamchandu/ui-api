import { useRouter, useHistory } from 'devfractal-router';
import React from 'react';
import { cast, string, keys, readonlyArray, recursion, record, union } from 'technoidentity-utils';

var Loading = function Loading() {
  return React.createElement("h1", {
    className: "is-text is-size-1 is-info"
  }, "Loading....");
}; // @TODO: need a nice error view similar to next.js?

var NotFound = function NotFound() {
  var _useRouter = useRouter(),
      location = _useRouter.location;

  return React.createElement("h1", null, "path " + location.pathname + " did not match any route");
}; // @TODO: This must use server error, if error.response.data is not undefined.

var ErrorView = function ErrorView(_ref) {
  var error = _ref.error;
  return React.createElement("h1", {
    className: "is-text is-size-1 is-danger"
  }, error.message);
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function useDel(asyncFn, onSuccess, onFailure) {
  var onClick = function onClick() {
    try {
      return Promise.resolve(asyncFn().then(onSuccess)["catch"](function (err) {
        if (err && err.response && err.response.data) {
          setServerError(err.response.data.error);

          if (onFailure) {
            onFailure(err);
          }
        } else if (onFailure) {
          onFailure(err);
        } else {
          throw err;
        }
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var _React$useState = React.useState(undefined),
      serverError = _React$useState[0],
      setServerError = _React$useState[1];

  return {
    serverError: serverError,
    onClick: onClick
  };
}

function Del(_ref) {
  var onDel = _ref.onDel,
      onSuccess = _ref.onSuccess,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["onDel", "onSuccess", "children"]);

  var _useDel = useDel(onDel, onSuccess),
      serverError = _useDel.serverError,
      onClick = _useDel.onClick;

  return React.createElement(React.Fragment, null, serverError && React.createElement("div", {
    className: "toast"
  }, serverError), React.createElement("button", Object.assign({}, props, {
    onClick: onClick
  }), children));
}

function useGet(asyncFn) {
  for (var _len = arguments.length, deps = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    deps[_key - 1] = arguments[_key];
  }

  var _React$useState = React.useState(undefined),
      data = _React$useState[0],
      setData = _React$useState[1];

  var _React$useState2 = React.useState(undefined),
      error = _React$useState2[0],
      setError = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      loading = _React$useState3[0],
      setLoading = _React$useState3[1];

  var _React$useState4 = React.useState(0),
      fetchAgain = _React$useState4[0],
      setFetchAgain = _React$useState4[1];

  var mounted = React.useRef(false);
  React.useEffect(function () {
    setLoading(true);
    mounted.current = true;
    asyncFn.apply(void 0, deps).then(function (data) {
      if (mounted.current) {
        setLoading(false);
        setData(data);
        setError(undefined);
      }
    })["catch"](function (error) {
      if (mounted.current) {
        setLoading(false);
        setError(error);
      }
    });
    return function () {
      mounted.current = false;
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [].concat(deps, [fetchAgain]));
  return _extends({
    refresh: function refresh() {
      return setFetchAgain(function (count) {
        return (count + 1) % 100;
      });
    }
  }, data ? {
    state: 'success',
    data: data
  } : error ? {
    state: 'failure',
    error: error
  } : {
    state: loading ? 'loading' : 'none'
  });
}

function Get(_ref) {
  var asyncFn = _ref.asyncFn,
      _ref$deps = _ref.deps,
      deps = _ref$deps === void 0 ? [] : _ref$deps,
      Component = _ref.component,
      children = _ref.children;
  var result = useGet.apply(void 0, [asyncFn].concat(deps));

  if (result.state === 'failure') {
    return React.createElement(ErrorView, {
      error: result.error
    });
  }

  if (result.state === 'success') {
    if (Component) {
      return React.createElement(Component, {
        data: result.data,
        fetchAgain: result.refresh
      });
    }

    if (children) {
      return children(result.data, result.refresh);
    }

    throw new Error('component or children must be provided to Get');
  }

  return React.createElement(Loading, null);
}

var SingleError = string;
var Errors =
/*#__PURE__*/
readonlyArray(string);
var ValidationErrors =
/*#__PURE__*/
recursion('ValidationErrors', function () {
  return record(string, union([SingleError, Errors, ValidationErrors]));
});
var ServerErrors =
/*#__PURE__*/
union([string, SingleError, Errors, ValidationErrors]);

function serverError(error) {
  cast(ServerErrors, error);

  if (string.is(error)) {
    return error;
  }

  if (SingleError.is(error)) {
    return error;
  }

  if (Errors.is(error)) {
    return error.join('\n');
  }

  if (ValidationErrors.is(error)) {
    return keys(error.validationErrors).map(function (k) {
      return k + ": " + serverError(error.validationErrors[k]);
    }).join('\n');
  }

  return 'FATAL: unknown server error';
}

var ServerError = function ServerError(_ref) {
  var error = _ref.error;
  return React.createElement(React.Fragment, null, error && React.createElement("article", {
    className: "message is-danger"
  }, React.createElement("div", {
    className: "message-body"
  }, serverError(error))));
};

function useSubmit(asyncFn, onSuccess, onFailure) {
  var onSubmit = function onSubmit(values, actions) {
    try {
      return Promise.resolve(asyncFn(values).then(function (values) {
        return onSuccess(values, actions);
      })["catch"](function (err) {
        if (err && err.response && err.response.data) {
          setServerError(err.response.data.error);

          if (onFailure) {
            onFailure(err, actions);
          }
        } else if (onFailure) {
          onFailure(err, actions);
        } else {
          throw err;
        }
      })["finally"](function () {
        return actions.setSubmitting(false);
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var _React$useState = React.useState(undefined),
      serverError = _React$useState[0],
      setServerError = _React$useState[1];

  return {
    serverError: serverError,
    onSubmit: onSubmit
  };
}
function useRedirect() {
  var history = useHistory();
  return {
    onRedirect: function onRedirect(path) {
      if (path) {
        history.push(path);
      }
    }
  };
}
function useSubmitRedirect(asyncFn, redirectTo) {
  var _useRedirect = useRedirect(),
      onRedirect = _useRedirect.onRedirect;

  return useSubmit(asyncFn, function () {
    return onRedirect(redirectTo);
  });
}
function useSubmitReset(asyncFn, noReset) {
  return useSubmit(asyncFn, function (values, actions) {
    actions.setValues(values);

    if (!noReset) {
      actions.resetForm();
    }
  });
}

function Patch(_ref) {
  var update = function update(data) {
    try {
      return Promise.resolve(onPatch(id, data));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var id = _ref.id,
      redirectTo = _ref.redirectTo,
      doGet = _ref.doGet,
      onPatch = _ref.onPatch,
      Component = _ref.component;

  var _useSubmitRedirect = useSubmitRedirect(update, redirectTo),
      serverError = _useSubmitRedirect.serverError,
      onSubmit = _useSubmitRedirect.onSubmit;

  return React.createElement(React.Fragment, null, React.createElement(ServerError, {
    error: serverError
  }), React.createElement(Get, {
    asyncFn: doGet,
    deps: [id]
  }, function (data) {
    return React.createElement(Component, {
      initial: data,
      onSubmit: onSubmit
    });
  }));
}

function PatchReset(_ref) {
  var update = function update(data) {
    try {
      return Promise.resolve(onPatch(id, data));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var id = _ref.id,
      doGet = _ref.doGet,
      onPatch = _ref.onPatch,
      Component = _ref.component;

  var _useSubmitReset = useSubmitReset(update),
      serverError = _useSubmitReset.serverError,
      onSubmit = _useSubmitReset.onSubmit;

  return React.createElement(React.Fragment, null, React.createElement(ServerError, {
    error: serverError
  }), React.createElement(Get, {
    asyncFn: doGet,
    deps: [id]
  }, function (data) {
    return React.createElement(Component, {
      initial: data,
      onSubmit: onSubmit
    });
  }));
}

function Post(_ref) {
  var redirectTo = _ref.redirectTo,
      onPost = _ref.onPost,
      Component = _ref.component;

  var _useSubmitRedirect = useSubmitRedirect(onPost, redirectTo),
      serverError = _useSubmitRedirect.serverError,
      onSubmit = _useSubmitRedirect.onSubmit;

  return React.createElement(React.Fragment, null, React.createElement(ServerError, {
    error: serverError
  }), React.createElement(Component, {
    onSubmit: onSubmit
  }));
}

function PostReset(_ref) {
  var onPost = _ref.onPost,
      Component = _ref.component;

  var _useSubmitReset = useSubmitReset(onPost),
      serverError = _useSubmitReset.serverError,
      onSubmit = _useSubmitReset.onSubmit;

  return React.createElement(React.Fragment, null, React.createElement(ServerError, {
    error: serverError
  }), React.createElement(Component, {
    onSubmit: onSubmit
  }));
}

function Put(_ref) {
  var update = function update(data) {
    try {
      return Promise.resolve(onPut(id, data));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var id = _ref.id,
      redirectTo = _ref.redirectTo,
      doGet = _ref.doGet,
      onPut = _ref.onPut,
      Component = _ref.component;

  var _useSubmitRedirect = useSubmitRedirect(update, redirectTo),
      serverError = _useSubmitRedirect.serverError,
      onSubmit = _useSubmitRedirect.onSubmit;

  return React.createElement(React.Fragment, null, React.createElement(ServerError, {
    error: serverError
  }), React.createElement(Get, {
    asyncFn: doGet,
    deps: [id]
  }, function (data) {
    return React.createElement(Component, {
      initial: data,
      onSubmit: onSubmit
    });
  }));
}

function PutReset(_ref) {
  var update = function update(data) {
    try {
      return Promise.resolve(onPut(id, data));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var id = _ref.id,
      doGet = _ref.doGet,
      onPut = _ref.onPut,
      Component = _ref.component;

  var _useSubmitReset = useSubmitReset(update),
      serverError = _useSubmitReset.serverError,
      onSubmit = _useSubmitReset.onSubmit;

  return React.createElement(React.Fragment, null, React.createElement(ServerError, {
    error: serverError
  }), React.createElement(Get, {
    asyncFn: doGet,
    deps: [id]
  }, function (data) {
    return React.createElement(Component, {
      initial: data,
      onSubmit: onSubmit
    });
  }));
}

export { Del, ErrorView, Get, Loading, NotFound, Patch, PatchReset, Post, PostReset, Put, PutReset, ServerError, useDel, useGet, useRedirect, useSubmit, useSubmitRedirect, useSubmitReset };
//# sourceMappingURL=devfractal-ui-api.esm.js.map
