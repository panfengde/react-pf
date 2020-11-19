const React = {};

//createElement运算后的返回结果，就是一个普通数据对象而已
//props里面会存有classname,style，children等属性，数据结构挺挺简单的。
const ReactElement = function (type, key, ref, props) {
    const element = {
        $$typeof: Symbol.for('react.element'),
        type: type,
        key: key,
        ref: ref,
        props: props,
    };
    return element
}

//jsx的编译后就会调用这个方法，返回的就是ReactElement
function createElement(type, config, children) {
    var props = {};
    var key = null;
    var ref = null;
    var childrenLength = arguments.length - 2;

    //整理props
    if (config != null) {
        ref = config.ref || null;
        key = config.key || null;
        for (let propName in config) {
            props[propName] = config[propName];
        }
    }

    //将children整理进入props
    //createElement函数第二个参数后的参数取出来判断长度，
    //大于一代表多个children.props.children存为一个数组。
    //如果是一个对象，就存为对象。所以对props.children的遍历要注意区分是对象还是数组。
    //可以使用React.Children进行遍历，它做了兼容处理
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

//class组件方法
function Component(props, context, updater) {
    this.props = props;
    //this.context = context;   context暂时不管，
    // ref 有好几个方式创建，字符串的不讲了，一般都是通过传入一个函数来给一个变量赋值 ref 的
    // ref={el => this.el = el} 这种方式最推荐
    // 当然还有种方式是通过 React.createRef 创建一个 ref 变量，然后这样使用
    // this.el = React.createRef()
    // ref={this.el}
    // 关于 React.createRef 就阅读 ReactCreateRef.js 文件了
    //this.refs = emptyObject;
    // 如果你在组件中打印 this 的话，可能看到过 updater 这个属性
    // 有兴趣可以去看看 ReactNoopUpdateQueue 中的内容，虽然没几个 API，并且也基本没啥用，都是用来报警告的
    // this.updater = updater || ReactNoopUpdateQueue; //react-dom里面会指定这个updater，这里不用管
    this.updater = {}; //react-dom里面会指定这个updater，这里不用管
}

Component.prototype.isReactComponent = {};

// 我们在组件中调用 setState 其实就是调用到这里了
Component.prototype.setState = function (partialState, callback) {
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
// 这个 API 很好用，不清楚作用的看文档吧
Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

React.createElement = createElement
React.Component = Component
//export default {createElement,Component}