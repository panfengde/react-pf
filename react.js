const React = {};


const ReactElement = function (type, key, ref, props) {
    const element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: Symbol.for('react.element'),
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
    };
    return element
}



React.createElement = function (type, config, children) {
    var props = {};
    var key = null;
    var ref = null;
    var childrenLength = arguments.length - 2;

    if (config != null) {
        ref = config.ref || null;

        key = config.key || null;


        for (propName in config) {
            props[propName] = config[propName];
        }
    }


    if (childrenLength === 1) {
        props.children = children;
    } else if (childrenLength > 1) {
        const childArray = Array(childrenLength);
        for (let i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
    }

    return ReactElement(type, key, ref, props);
}

React.Component = Component

function Component(props, context, updater) {
    this.props = props;
    //this.context = context;
    // ref 有好几个方式创建，字符串的不讲了，一般都是通过传入一个函数来给一个变量赋值 ref 的
    // ref={el => this.el = el} 这种方式最推荐
    // 当然还有种方式是通过 React.createRef 创建一个 ref 变量，然后这样使用
    // this.el = React.createRef()
    // ref={this.el}
    // 关于 React.createRef 就阅读 ReactCreateRef.js 文件了
    //this.refs = emptyObject;
    // 如果你在组件中打印 this 的话，可能看到过 updater 这个属性
    // 有兴趣可以去看看 ReactNoopUpdateQueue 中的内容，虽然没几个 API，并且也基本没啥用，都是用来报警告的
    //this.updater = updater || ReactNoopUpdateQueue;
}


Component.prototype.isReactComponent = {};

// 我们在组件中调用 setState 其实就是调用到这里了
// 用法不说了，如果不清楚的把上面的注释和相应的文档看一下就行
// 一开始以为 setState 一大堆逻辑，结果就是调用了 updater 里的方法
// 所以 updater 还是个蛮重要的东西

Component.prototype.setState = function (partialState, callback) {
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

// 这个 API 用的很好，不清楚作用的看文档吧
Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};