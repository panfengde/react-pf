var prefixedEventNames = {};

var vendorPrefixes = {
    animationend: makePrefixMap('Animation', 'AnimationEnd'),
    animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
    animationstart: makePrefixMap('Animation', 'AnimationStart'),
    transitionend: makePrefixMap('Transition', 'TransitionEnd')
};

var DiscreteEvent = 0;
var eventPriorities = new Map();

function makePrefixMap(styleProp, eventName) {
    var prefixes = {};
    prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
    prefixes['Webkit' + styleProp] = 'webkit' + eventName;
    prefixes['Moz' + styleProp] = 'moz' + eventName;
    return prefixes;
}
var TOP_ABORT = unsafeCastStringToDOMTopLevelType('abort');
var TOP_ANIMATION_END = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationend'));
var TOP_ANIMATION_ITERATION = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationiteration'));
var TOP_ANIMATION_START = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationstart'));
var TOP_BLUR = unsafeCastStringToDOMTopLevelType('blur');
var TOP_CAN_PLAY = unsafeCastStringToDOMTopLevelType('canplay');
var TOP_CAN_PLAY_THROUGH = unsafeCastStringToDOMTopLevelType('canplaythrough');
var TOP_CANCEL = unsafeCastStringToDOMTopLevelType('cancel');
var TOP_CHANGE = unsafeCastStringToDOMTopLevelType('change');
var TOP_CLICK = unsafeCastStringToDOMTopLevelType('click');
var TOP_CLOSE = unsafeCastStringToDOMTopLevelType('close');
var TOP_COMPOSITION_END = unsafeCastStringToDOMTopLevelType('compositionend');
var TOP_COMPOSITION_START = unsafeCastStringToDOMTopLevelType('compositionstart');
var TOP_COMPOSITION_UPDATE = unsafeCastStringToDOMTopLevelType('compositionupdate');
var TOP_CONTEXT_MENU = unsafeCastStringToDOMTopLevelType('contextmenu');
var TOP_COPY = unsafeCastStringToDOMTopLevelType('copy');
var TOP_CUT = unsafeCastStringToDOMTopLevelType('cut');
var TOP_DOUBLE_CLICK = unsafeCastStringToDOMTopLevelType('dblclick');
var TOP_AUX_CLICK = unsafeCastStringToDOMTopLevelType('auxclick');
var TOP_DRAG = unsafeCastStringToDOMTopLevelType('drag');
var TOP_DRAG_END = unsafeCastStringToDOMTopLevelType('dragend');
var TOP_DRAG_ENTER = unsafeCastStringToDOMTopLevelType('dragenter');
var TOP_DRAG_EXIT = unsafeCastStringToDOMTopLevelType('dragexit');
var TOP_DRAG_LEAVE = unsafeCastStringToDOMTopLevelType('dragleave');
var TOP_DRAG_OVER = unsafeCastStringToDOMTopLevelType('dragover');
var TOP_DRAG_START = unsafeCastStringToDOMTopLevelType('dragstart');
var TOP_DROP = unsafeCastStringToDOMTopLevelType('drop');
var TOP_DURATION_CHANGE = unsafeCastStringToDOMTopLevelType('durationchange');
var TOP_EMPTIED = unsafeCastStringToDOMTopLevelType('emptied');
var TOP_ENCRYPTED = unsafeCastStringToDOMTopLevelType('encrypted');
var TOP_ENDED = unsafeCastStringToDOMTopLevelType('ended');
var TOP_ERROR = unsafeCastStringToDOMTopLevelType('error');
var TOP_FOCUS = unsafeCastStringToDOMTopLevelType('focus');
var TOP_GOT_POINTER_CAPTURE = unsafeCastStringToDOMTopLevelType('gotpointercapture');
var TOP_INPUT = unsafeCastStringToDOMTopLevelType('input');
var TOP_INVALID = unsafeCastStringToDOMTopLevelType('invalid');
var TOP_KEY_DOWN = unsafeCastStringToDOMTopLevelType('keydown');
var TOP_KEY_PRESS = unsafeCastStringToDOMTopLevelType('keypress');
var TOP_KEY_UP = unsafeCastStringToDOMTopLevelType('keyup');
var TOP_LOAD = unsafeCastStringToDOMTopLevelType('load');
var TOP_LOAD_START = unsafeCastStringToDOMTopLevelType('loadstart');
var TOP_LOADED_DATA = unsafeCastStringToDOMTopLevelType('loadeddata');
var TOP_LOADED_METADATA = unsafeCastStringToDOMTopLevelType('loadedmetadata');
var TOP_LOST_POINTER_CAPTURE = unsafeCastStringToDOMTopLevelType('lostpointercapture');
var TOP_MOUSE_DOWN = unsafeCastStringToDOMTopLevelType('mousedown');
var TOP_MOUSE_MOVE = unsafeCastStringToDOMTopLevelType('mousemove');
var TOP_MOUSE_OUT = unsafeCastStringToDOMTopLevelType('mouseout');
var TOP_MOUSE_OVER = unsafeCastStringToDOMTopLevelType('mouseover');
var TOP_MOUSE_UP = unsafeCastStringToDOMTopLevelType('mouseup');
var TOP_PASTE = unsafeCastStringToDOMTopLevelType('paste');
var TOP_PAUSE = unsafeCastStringToDOMTopLevelType('pause');
var TOP_PLAY = unsafeCastStringToDOMTopLevelType('play');
var TOP_PLAYING = unsafeCastStringToDOMTopLevelType('playing');
var TOP_POINTER_CANCEL = unsafeCastStringToDOMTopLevelType('pointercancel');
var TOP_POINTER_DOWN = unsafeCastStringToDOMTopLevelType('pointerdown');
var TOP_POINTER_MOVE = unsafeCastStringToDOMTopLevelType('pointermove');
var TOP_POINTER_OUT = unsafeCastStringToDOMTopLevelType('pointerout');
var TOP_POINTER_OVER = unsafeCastStringToDOMTopLevelType('pointerover');
var TOP_POINTER_UP = unsafeCastStringToDOMTopLevelType('pointerup');
var TOP_PROGRESS = unsafeCastStringToDOMTopLevelType('progress');
var TOP_RATE_CHANGE = unsafeCastStringToDOMTopLevelType('ratechange');
var TOP_RESET = unsafeCastStringToDOMTopLevelType('reset');
var TOP_SCROLL = unsafeCastStringToDOMTopLevelType('scroll');
var TOP_SEEKED = unsafeCastStringToDOMTopLevelType('seeked');
var TOP_SEEKING = unsafeCastStringToDOMTopLevelType('seeking');
var TOP_SELECTION_CHANGE = unsafeCastStringToDOMTopLevelType('selectionchange');
var TOP_STALLED = unsafeCastStringToDOMTopLevelType('stalled');
var TOP_SUBMIT = unsafeCastStringToDOMTopLevelType('submit');
var TOP_SUSPEND = unsafeCastStringToDOMTopLevelType('suspend');
var TOP_TEXT_INPUT = unsafeCastStringToDOMTopLevelType('textInput');
var TOP_TIME_UPDATE = unsafeCastStringToDOMTopLevelType('timeupdate');
var TOP_TOGGLE = unsafeCastStringToDOMTopLevelType('toggle');
var TOP_TOUCH_CANCEL = unsafeCastStringToDOMTopLevelType('touchcancel');
var TOP_TOUCH_END = unsafeCastStringToDOMTopLevelType('touchend');
var TOP_TOUCH_MOVE = unsafeCastStringToDOMTopLevelType('touchmove');
var TOP_TOUCH_START = unsafeCastStringToDOMTopLevelType('touchstart');
var TOP_TRANSITION_END = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('transitionend'));
var TOP_VOLUME_CHANGE = unsafeCastStringToDOMTopLevelType('volumechange');
var TOP_WAITING = unsafeCastStringToDOMTopLevelType('waiting');
var TOP_WHEEL = unsafeCastStringToDOMTopLevelType('wheel');
//↓↓↓↓↓↓--------***---------↓↓↓↓↓↓
//↑↑↑↑↑↑--------***---------↑↑↑↑↑↑

const ReactDOM = {}
var workInProgress = null; //工作单元代理变量
var nextEffect = null;
var REACT_ELEMENT_TYPE = Symbol.for('react.element')

var registrationNameModules = {};
var eventPluginOrder = null;
//↓↓↓↓↓↓--------关于时间的常量---------↓↓↓↓↓↓
{
    var MAX_SIGNED_31_BIT_INT = 1073741823;
    var NoWork = 0;
    var Never = 1;
    var Idle = 2;
    var ContinuousHydration = 3;
    var Sync = MAX_SIGNED_31_BIT_INT; //1073741823;
    var Batched = Sync - 1; //1073741822;
    var UNIT_SIZE = 10;
    var MAGIC_NUMBER_OFFSET = Batched - 1; // 1 unit of expiration time represents 10ms. //1073741821
}
//↑↑↑↑↑↑--------关于时间的常量---------↑↑↑↑↑↑

//↓↓↓↓↓↓--------fiber节点的tag类型---------↓↓↓↓↓↓
{
    var FunctionComponent = 0;
    var ClassComponent = 1;
    var IndeterminateComponent = 2; // Before we know whether it is function or class
    var HostRoot = 3; // Root of a host tree. Could be nested inside another node.
    var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
    var HostComponent = 5;
    var HostText = 6;
}
//↑↑↑↑↑↑--------fiber节点的tag类型---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------关于操作和副作用的常量---------↓↓↓↓↓↓
{
    //这些常量都是要参与位运算的常量
    //之所以使用位运算，是为了让一个变量，可以展示、运算多种状态

    var NoEffect =
        /*              */
        0; //0
    var PerformedWork =
        /*         */
        1; //1
    // You can change the rest (and add more).

    var Placement =
        /*             */
        2; //10
    var Update =
        /*                */
        4; //100
    var PlacementAndUpdate =
        /*    */
        6; //110
    var Deletion =
        /*              */
        8; //1000
    var ContentReset =
        /*          */
        16; //10000
    var Callback =
        /*              */
        32; //100000
    var DidCapture =
        /*            */
        64; // 1000000
    var Ref =
        /*                   */
        128; //1000000000
    var Snapshot =
        /*              */
        256; //10000000000
    var Passive =
        /*               */
        512; //10000000100
    var Hydrating =
        /*             */
        1024; //10000000000
    var HydratingAndUpdate =
        /*    */
        1028; //1110100100
    // Passive & Update & Callback & Ref & Snapshot

    var LifecycleEffectMask =
        /*   */
        932; //1110100100
    // Union of all host effects

    var HostEffectMask =
        /*        */
        2047; //11111111111
    var Incomplete =
        /*            */
        2048; //100000000000

    var ShouldCapture =
        /*         */
        4096; //1000000000000
}
//↑↑↑↑↑↑--------关于操作和副作用的常量---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------还不知道作用的常量---------↓↓↓↓↓↓
{
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var COMMENT_NODE = 8;
    var DOCUMENT_NODE = 9;
    var DOCUMENT_FRAGMENT_NODE = 11;

}
//↑↑↑↑↑↑--------还不知道作用的常量---------↑↑↑↑↑↑




//↓↓↓↓↓↓--------生命周期---------↓↓↓↓↓↓
{
    function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
        var prevState = workInProgress.memoizedState;


        var partialState = getDerivedStateFromProps(nextProps, prevState);


        var memoizedState = partialState === null || partialState === undefined ? prevState : _assign({}, prevState, partialState);
        workInProgress.memoizedState = memoizedState; // Once the update queue is empty, persist the derived state onto the
        // base state.

        if (workInProgress.expirationTime === NoWork) {
            // Queue is always non-null for classes
            var updateQueue = workInProgress.updateQueue;
            updateQueue.baseState = memoizedState;
        }
    }


    function callComponentWillMount(workInProgress, instance) {
        // startPhaseTimer(workInProgress, 'componentWillMount');
        var oldState = instance.state;

        if (typeof instance.componentWillMount === 'function') {
            instance.componentWillMount();
        }

        if (typeof instance.UNSAFE_componentWillMount === 'function') {
            instance.UNSAFE_componentWillMount();
        }

        //stopPhaseTimer();

        if (oldState !== instance.state) {
            {
                console.error('componentWillMount')
            }

            //classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
        }
    }
}

//↑↑↑↑↑↑--------生命周期---------↑↑↑↑↑↑



//↓↓↓↓↓↓--------工具函数---------↓↓↓↓↓↓
{
    var isArray$1 = Array.isArray;

    function get(key) {
        return key._reactInternalFiber;
    }

    function has(key) {
        return key._reactInternalFiber !== undefined;
    }

    function set(key, value) {
        key._reactInternalFiber = value;
    }

    //合并component的props
    function resolveDefaultProps(Component, baseProps) {

        if (Component && Component.defaultProps) {
            // Resolve default props. Taken from ReactElement
            var props = _assign({}, baseProps);

            var defaultProps = Component.defaultProps;

            for (var propName in defaultProps) {
                if (props[propName] === undefined) {
                    props[propName] = defaultProps[propName];
                }
            }

            return props;
        }

        return baseProps;
    }

    //_assign方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    function _assign(target, ...source) {
        return Object.assign(target, ...sources)
    }

    function isCustomComponent(tagName, props) {
        if (tagName.indexOf('-') === -1) {
            return typeof props.is === 'string';
        }
        switch (tagName) {
            // These are reserved SVG and MathML elements.
            // We don't mind this whitelist too much because we expect it to never grow.
            // The alternative is to track the namespace in a few places which is convoluted.
            // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
            case 'annotation-xml':
            case 'color-profile':
            case 'font-face':
            case 'font-face-src':
            case 'font-face-uri':
            case 'font-face-format':
            case 'font-face-name':
            case 'missing-glyph':
                return false;
            default:
                return true;
        }
    }


    function appendChild(parentInstance, child) {
        parentInstance.appendChild(child);
    }

    function insertBefore(parentInstance, child, beforeChild) {
        parentInstance.insertBefore(child, beforeChild);
    }

}
//↑↑↑↑↑↑--------工具函数---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------关于fiber节点的函数---------↓↓↓↓↓↓
{
    //创建一个普通的fiber节点
    function createFiber(tag, pendingProps, key, mode) {
        return new FiberNode(tag, pendingProps, key, mode)
    }

    //生成普通fiber节点的函数
    function FiberNode(tag, pendingProps, key, mode) {
        // Instance
        //标记不同的组件类型
        //有原生的DOM节点，有React自己的节点
        this.tag = tag;
        //ReactElement里面的key
        this.key = key;
        //ReactElement.type，也就是我们调用createElement的第一个参数
        this.elementType = null;
        //异步组件resolve之后返回的内容，一般是function或class
        //比如懒加载
        this.type = null;

        //当前Fiber的状态（比如浏览器环境就是DOM节点）  
        //不同类型的实例都会记录在stateNode上  
        //比如DOM组件对应DOM节点实例  
        //ClassComponent对应Class实例  
        //FunctionComponent没有实例，所以stateNode值为null  
        //state更新了或props更新了均会更新到stateNode上
        this.stateNode = null; // Fiber

        //指向该对象在Fiber节点树中的`parent`，用来在处理完该节点后返回
        //即流程图上的红线
        this.return = null;
        //指向自己的第一个子节点
        this.child = null;
        //指向自己的兄弟结构
        //兄弟节点的return指向同一个父节点
        this.sibling = null;
        this.index = 0;
        //ref属性
        this.ref = null;
        //新的变动带来的新的props，即nextProps
        this.pendingProps = pendingProps;
        //上一次渲染完成后的props,即 props
        this.memoizedProps = null;
        //该Fiber对应的组件，所产生的update，都会放在该队列中
        this.updateQueue = null;

        //上次渲染的state，即 state
        //新的state由updateQueue计算得出，并覆盖memoizedState
        this.memoizedState = null;

        //一个列表，存在该Fiber依赖的contexts，events
        this.dependencies = null;

        //mode有conCurrentMode和strictMode

        //用来描述当前Fiber和其他子树的Bitfield
        //共存的模式表示这个子树是否默认是 异步渲染的

        //Fiber刚被创建时，会继承父Fiber
        //this.mode = mode; 

        // Effects
        //以下属性是副作用
        //副作用是 标记组件哪些需要更新的工具、标记组件需要执行哪些生命周期的工具
        this.effectTag = NoEffect;
        //16进制的数字，可以理解为通过一个字段标识n个动作，如Placement、Update、Deletion、Callback……所以源码中看到很多 &=

        this.nextEffect = null;
        //表示下一个将要处理的副作用FiberNode的引用

        this.firstEffect = null;
        //与副作用操作遍历流程相关 当前节点下，第一个需要处理的副作用FiberNode的引用

        this.lastEffect = null;
        //表示最后一个将要处理的副作用FiberNode的引用

        //代表任务在未来的哪个时间点 应该被完成
        //不包括该Fiber的子树产生的任务
        this.expirationTime = NoWork; //ExpirationTime

        //快速确定子树中是否有 update
        //如果子节点有update的话，就记录应该更新的时间
        this.childExpirationTime = NoWork; //ExpirationTime

        // 在FIber树更新的过程中，每个Fiber都有与其对应的Fiber 
        //我们称之为 current <==> workInProgress 
        //在渲染完成后，会交换位置  
        //doubleBuffer Fiber在更新后，不用再重新创建对象，  
        // 而是复制自身，并且两者相互复用，用来提高性能
        this.alternate = null;

    }

    //创建fiber数据结构根节点的函数。生成一个对象
    function FiberRootNode(containerInfo, tag = 0) {
        this.tag = tag;
        this.current = null;
        this.containerInfo = containerInfo;
        this.pendingChildren = null;
        this.pingCache = null;
        //this.finishedExpirationTime = NoWork;
        this.finishedWork = null;
        // this.timeoutHandle = noTimeout;
        this.context = null;
        this.pendingContext = null;
        this.hydrate = false;
        this.callbackNode = null;
        // this.callbackPriority = NoPriority;
        // this.firstPendingTime = NoWork;
        // this.firstSuspendedTime = NoWork;
        // this.lastSuspendedTime = NoWork;
        // this.nextKnownPendingLevel = NoWork;
        // this.lastPingedTime = NoWork;
        // this.lastExpiredTime = NoWork;
    }


    function createFiberFromFragment(elements, mode, expirationTime, key) {
        var fiber = createFiber(Fragment, elements, key, mode);
        fiber.expirationTime = expirationTime;
        return fiber;
    }

    /**
     * 根据元素的type和props生成fiber
     * <span/> <App/> 的type分别时span 、ƒ App(props)
     * 
     */
    function createFiberFromTypeAndProps(type, // React$ElementType
        key, pendingProps, owner, mode, expirationTime) {
        var fiber;
        var fiberTag; // The resolved type is set if we know what the final type will be. I.e. it's not lazy.

        var resolvedType = type;

        if (typeof type === 'function') {
            fiberTag = ClassComponent;
        } else if (typeof type === 'string') {
            fiberTag = HostComponent;
        } else {
            getTag: switch (type) {
                default: {}
            }
        }

        fiber = createFiber(fiberTag, pendingProps, key, mode);
        fiber.elementType = type;
        fiber.type = resolvedType;
        fiber.expirationTime = expirationTime;
        return fiber;
    }

    function createFiberFromText(content, mode, expirationTime) {
        var fiber = createFiber(HostText, content, null, mode);
        fiber.expirationTime = expirationTime;
        return fiber;
    }


    //根据单个子元素的情况，如type和props等，生成一个fiber,并返回。
    function createFiberFromElement(element, mode, expirationTime) {
        var owner = null;
        var type = element.type;
        var key = element.key;
        var pendingProps = element.props;

        //根据元素的type和props生成fiber
        //<span/> <App/> 的type分别时span 、ƒ App(props)
        var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime);

        return fiber;
    }

    function isHostParent(fiber) {
        return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
    }

    //向上查找，返回是 DOM 元素的父节点(如果不是dom元素，如是class元素就不是dom，继续网上找。HostComponent，HostRoot可以)
    function getHostParentFiber(fiber) {
        var parent = fiber.return;

        while (parent !== null) {
            if (isHostParent(parent)) {
                return parent;
            }

            parent = parent.return;
        }
    }

    function getHostSibling(fiber) {


        // We're going to search forward into the tree until we find a sibling host
        // node. Unfortunately, if multiple insertions are done in a row we have to
        // search past them. This leads to exponential search for the next sibling.
        // TODO: Find a more efficient way to do this.
        var node = fiber;
        //循环，找到所有子节点
        siblings: while (true) {
            // If we didn't find anything, let's try the next sibling.
            while (node.sibling === null) {
                if (node.return === null || isHostParent(node.return)) {
                    // If we pop out of the root or hit the parent the fiber we are the
                    // last sibling.
                    return null;
                }

                node = node.return;
            }

            node.sibling.return = node.return;
            node = node.sibling;

            while (node.tag !== HostComponent && node.tag !== HostText && node.tag !== DehydratedFragment) {
                // If it is not host node and, we might have a host node inside it.
                // Try to search down until we find one.
                if (node.effectTag & Placement) {
                    // If we don't have a child, try the siblings instead.
                    continue siblings;
                } // If we don't have a child, try the siblings instead.
                // We also skip portals because they are not part of this host tree.


                if (node.child === null || node.tag === HostPortal) {
                    continue siblings;
                } else {
                    node.child.return = node;
                    node = node.child;
                }
            } // Check if this host node is stable or about to be placed.


            if (!(node.effectTag & Placement)) {
                // Found it!
                return node.stateNode;
            }
        }
    }


}
//↑↑↑↑↑↑--------关于fiber节点的创建---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------关于时间的函数---------↓↓↓↓↓↓
{

    function requestCurrentTimeForUpdate() {
        return 1073741821 - (100 / 10 | 0)
    }

    function computeExpirationForFiber() {
        return Sync
    }


}
//↑↑↑↑↑↑--------关于时间的函数---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------关于update对象的函数---------↓↓↓↓↓↓
{
    /**
     * 创建更新包对象。一个由next属性链接的环状结构
     * 
     * tag属性，存储更新包的类型。0更新 1替换 2强制更新 3捕获性的更新
     * payload存储更新材料
     * next指向下一个更新。默认obj的下一个更新还是obj
     */

    function createUpdate(expirationTime, suspenseConfig = null) {
        var update = {
            // 过期时间
            expirationTime: expirationTime,
            suspenseConfig: suspenseConfig,

            // export const UpdateState = 0;
            // export const ReplaceState = 1;
            // export const ForceUpdate = 2;
            // export const CaptureUpdate = 3;
            // 指定更新的类型，值为以上几种
            // 提下CaptureUpdate，在React16后有一个ErrorBoundaries功能
            // 即在渲染过程中报错了，可以选择新的渲染状态（提示有错误的状态），来更新页面
            // 0更新 1替换 2强制更新 3捕获性的更新
            //tag: UpdateState,
            tag: 0,

            // 更新内容，比如`setState`接收的第一个参数
            // 第一次渲染ReactDOM.render接收的是payload = {element};
            payload: null,

            // 更新完成后对应的回调，`setState`，`render`都有
            callback: null,

            // 指向下一个更新
            next: null
        };
        update.next = update;

        return update;
    }


    /**
     * 
     * 将update挂载在fiber.updateQueue.pending的第一位置
     * pending的update是个环状结构
     * 
     * 原来如果有pengding现在就顺延为下一个
     * 
     */
    function enqueueUpdate(fiber, update) {

        //更新后面
        var updateQueue = fiber.updateQueue;
        var sharedQueue = updateQueue.shared;
        var pending = sharedQueue.pending;
        if (pending === null) {
            // This is the first update. Create a circular list.
            update.next = update;
        } else {
            //这里什么意思？？？？？放弃pengding的更新？？？
            update.next = pending.next;
            pending.next = update;
        }

        sharedQueue.pending = update;
    }

    /**
     * fiber节点初始化updateQueue属性。
     * 即fiber.updateQueue已经有一个初始化后的queue对象结构
     * queue对象会保留fiber本身的memoizedState值，存在baseState中
     */
    function initializeUpdateQueue(fiber) {
        //fiber
        var queue = {
            // 应用更新后的state
            // 每次的更新都是在这个baseState基础上进行更新
            baseState: fiber.memoizedState,
            baseQueue: null,
            shared: {
                pending: null
            },
            effects: null
        };
        fiber.updateQueue = queue;
    }


    function cloneUpdateQueue(current, workInProgress) {

        //不懂这个函数的作用
        // Clone the update queue from current. Unless it's already a clone.
        var queue = workInProgress.updateQueue;
        var currentQueue = current.updateQueue;
        // if (queue !== currentQueue) {

        //react源码中，这里用的时===,很奇怪。
        //既然都相等了，又何必赋值。所以我认为这里为react的一个bug
        //我将它修改为!==
        //不想等时，才从源头克隆，一份updateQueue给当前工作单元
        if (queue === currentQueue) {
            var clone = {
                baseState: currentQueue.baseState,
                baseQueue: currentQueue.baseQueue,
                shared: currentQueue.shared,
                effects: currentQueue.effects
            };
            workInProgress.updateQueue = clone;
        }
    }

    // 处理更新队列，得出新的state 
    //将新的state赋予memoizedState。 workInProgress.memoizedState = newState;
    function processUpdateQueue(workInProgress, props, instance, renderExpirationTime) {
        //这个方法要做的事情，就是遍历这个 UpdateQueue ，
        //然后计算出最后的新 State，然后存到workInProgress.memoizedState和 instance 中
        var queue = workInProgress.updateQueue;
        var baseQueue = queue.baseQueue; // The last pending update that hasn't been processed yet.

        var pendingQueue = queue.shared.pending;

        if (pendingQueue !== null) {
            //将workInProgress.updateQueue中的pendingQueue赋值给 workInProgress.alternate.updateQueue.baseQueue
            // We have new updates that haven't been processed yet.
            // We'll add them to the base queue.
            if (baseQueue !== null) {
                // Merge the pending queue and the base queue.
                var baseFirst = baseQueue.next;
                var pendingFirst = pendingQueue.next;
                baseQueue.next = pendingFirst;
                pendingQueue.next = baseFirst;
            }

            baseQueue = pendingQueue;
            queue.shared.pending = null;

            var current = workInProgress.alternate;

            if (current !== null) {
                var currentQueue = current.updateQueue;
                if (currentQueue !== null) {
                    currentQueue.baseQueue = pendingQueue;
                }
            }
        }


        if (baseQueue !== null) {
            var first = baseQueue.next; // Iterate through the list of updates to compute the result.

            var newState = queue.baseState;
            var newExpirationTime = NoWork;
            var newBaseState = null;
            var newBaseQueueFirst = null;
            var newBaseQueueLast = null;

            if (first !== null) {
                var update = first;

                do {

                    newState = getStateFromUpdate(workInProgress, queue, update, newState, props, instance);

                    update = update.next;

                    if (update === null || update === first) {
                        pendingQueue = queue.shared.pending;
                        if (pendingQueue === null) {
                            break;
                        } else {
                            // An update was scheduled from inside a reducer. Add the new
                            // pending updates to the end of the list and keep processing.
                            update = baseQueue.next = pendingQueue.next;
                            pendingQueue.next = first;
                            queue.baseQueue = baseQueue = pendingQueue;
                            queue.shared.pending = null;
                        }
                    }
                } while (true);
            }

            if (newBaseQueueLast === null) {
                newBaseState = newState;
            } else {
                newBaseQueueLast.next = newBaseQueueFirst;
            }

            queue.baseState = newBaseState;
            queue.baseQueue = newBaseQueueLast;

            workInProgress.expirationTime = newExpirationTime;
            workInProgress.memoizedState = newState;
        }


    }

    function getStateFromUpdate(workInProgress, queue, update, prevState, nextProps, instance) {
        switch (update.tag) {
            case 0: {
                //UpdateState=0

                var _payload = update.payload;
                var partialState;

                if (typeof _payload === 'function') {
                    // Updater function

                } else {
                    // Partial state object
                    partialState = _payload;
                }

                if (partialState === null || partialState === undefined) {
                    // Null and undefined are treated as no-ops.
                    return prevState;
                } // Merge the partial state and the previous state.


                return {
                    ...prevState,
                    ...partialState
                };
            }
        }

        return prevState;
    }

}
//↑↑↑↑↑↑--------关于update对象的函数---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------关于DOM的操作---------↓↓↓↓↓↓
{
    //将该 DOM 节点的 value 设置为 ''
    function resetTextContent(domElement) {
        setTextContent(domElement, '');
    }
    //重置文字内容
    function commitResetTextContent(current) {

        resetTextContent(current.stateNode);
    }

    function setTextContent(node, text) {
        if (text) {
            var firstChild = node.firstChild;

            if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
                //TEXT_NODE=3
                firstChild.nodeValue = text;
                return;
            }
        }

        node.textContent = text;
    };

    function commitDetachRef(current) {
        var currentRef = current.ref;

        if (currentRef !== null) {
            if (typeof currentRef === 'function') {
                currentRef(null);
            } else {
                currentRef.current = null;
            }
        }
    }

    function commitTextUpdate(textInstance, oldText, newText) {
        textInstance.nodeValue = newText;
    }


    function updateProperties(domElement, updatePayload, tag, lastRawProps, nextRawProps) {
        // Update checked *before* name.
        // In the middle of an update, it is possible to have multiple checked.
        // When a checked radio tries to change name, browser makes another radio's checked false.
        if (tag === 'input' && nextRawProps.type === 'radio' && nextRawProps.name != null) {
            updateChecked(domElement, nextRawProps);
        }

        var wasCustomComponentTag = isCustomComponent(tag, lastRawProps);
        var isCustomComponentTag = isCustomComponent(tag, nextRawProps); // Apply the diff.

        updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag); // TODO: Ensure that an update gets scheduled if any of the special props
        // changed.

        switch (tag) {
            case 'input':
                // Update the wrapper around inputs *after* updating props. This has to
                // happen after `updateDOMProperties`. Otherwise HTML5 input validations
                // raise warnings and prevent the new value from being assigned.
                updateWrapper(domElement, nextRawProps);
                break;

            case 'textarea':
                updateWrapper$1(domElement, nextRawProps);
                break;

            case 'select':
                // <select> value update needs to occur after <option> children
                // reconciliation
                postUpdateWrapper(domElement, nextRawProps);
                break;
        }
    }


    function updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag) {
        // TODO: Handle wasCustomComponentTag
        for (var i = 0; i < updatePayload.length; i += 2) {
            var propKey = updatePayload[i];
            var propValue = updatePayload[i + 1];

            if (propKey === STYLE) {
                setValueForStyles(domElement, propValue);
            } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
                setInnerHTML(domElement, propValue);
            } else if (propKey === CHILDREN) {
                setTextContent(domElement, propValue);
            } else {
                setValueForProperty(domElement, propKey, propValue, isCustomComponentTag);
            }
        }
    }


    function setInnerHTML(node, html) {
        node.innerHTML = html;
    }

    function setValueForProperty(node, name, value, isCustomComponentTag) {

        /* 
              if (attributeNamespace) {
                node.setAttributeNS(attributeNamespace, attributeName, attributeValue);
              } else {
                node.setAttribute(attributeName, attributeValue);
              } */

    }

    function createTextNode(text, rootContainerElement) {
        return document.createTextNode(text);
    }

    function createTextInstance(text) {
        var textNode = createTextNode(text);
        return textNode;
    }

    function dangerousStyleValue(name, value, isCustomProperty) {
        var isEmpty = value == null || typeof value === 'boolean' || value === '';

        if (isEmpty) {
            return '';
        }

        if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
            return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
        }

        return ('' + value).trim();
    }

    function setValueForStyles(node, styles) {
        var style = node.style;

        for (var styleName in styles) {
            if (!styles.hasOwnProperty(styleName)) {
                continue;
            }

            var isCustomProperty = styleName.indexOf('--') === 0;


            var styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);

            if (styleName === 'float') {
                styleName = 'cssFloat';
            }

            if (isCustomProperty) {
                style.setProperty(styleName, styleValue);
            } else {
                style[styleName] = styleValue;
            }
        }
    }


}
//↑↑↑↑↑↑--------关于DOM的操作---------↑↑↑↑↑↑

var classComponentUpdater = {}



//↓↓↓↓↓↓--------finishSyncRender---------↓↓↓↓↓↓
{
    //render分析完成，生成fiber树，开始渲染工作。
    function finishSyncRender(root) {
        // Set this to null to indicate there's no in-progress render.
        // workInProgressRoot = null;
        commitRoot(root);
    }

    //comit提交fier树的变化
    function commitRoot(root) {
        commitRootImpl(root, renderPriorityLevel = null);

        return null;
        //本版本还不需要用到调度。级别什么的暂时不管

        //https://mp.weixin.qq.com/s?__biz=MzU1MDg1NTQ5NQ==&mid=2247484630&idx=1&sn=89a58e3eee0a37a53d2be14215a2276c&chksm=fb9b72feccecfbe8ec62eb2bd2beb85bbf97559d705ddd53d00e0d08d1a5c2391cca722fea3a&scene=21#wechat_redirect
        //渲染优先级
        //ImmediatePriority，优先级为 99，最高优先级，立即执行
        //bind函数，请看：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
        //获取调度优先级，并临时替换当前的优先级，去执行传进来的 callback
        var renderPriorityLevel = getCurrentPriorityLevel();
        //获取调度优先级，并临时替换当前的优先级，去执行传进来的 callback
        //由于ImmediatePriority是最高等级的优先级，所以会立即执行commitRootImpl()方法
        runWithPriority$1(ImmediatePriority, commitRootImpl.bind(null, root, renderPriorityLevel));
        return null;
    }

    function commitRootImpl(root, renderPriorityLevel) {

        //分析完成的fiber树
        var finishedWork = root.finishedWork;
        //root.finishedWork就是root.current.alternate;就是fiber坑位后面的刚分析好的fiber树，还没提交

        var expirationTime = root.finishedExpirationTime;

        //表示该节点没有要更新的任务，直接return
        if (finishedWork === null) {
            return null;
        }

        //重置
        //赋值给变量 finishedWork、expirationTime 后重置成初始值
        //因为下面在对finishedWork、expirationTime 进行 commit后，任务就完成了
        root.finishedWork = null;
        root.finishedExpirationTime = NoWork;

        //获取 effect 链
        //根据effect链，来渲染dom的变化情况
        console.log(finishedWork)
        var firstEffect;

        //如果RootFiber 的 effectTag 有值的话，也就是说RootFiber也要commit的话
        //将它的 finishedWork 也插入到 effect 链上，放到effect 链的最后 lastEffect.nextEffect 上


        //createWorkInProgress(current, pendingProps) 函数在生成针对hostTag的workInProgress时，赋值workInProgress.effectTag=noEfect
        //后面没看到哪里修改了针对HostTag的workInProgress.effect属性


        if (finishedWork.effectTag > PerformedWork) {
            //第一次render不走这里，不知道什么用处，暂时不管

            if (finishedWork.lastEffect !== null) {
                finishedWork.lastEffect.nextEffect = finishedWork;
                firstEffect = finishedWork.firstEffect;
            } else {
                firstEffect = finishedWork;
            }

        } else {

            firstEffect = finishedWork.firstEffect;
        }

        //根据effect链条，开始commit
        //commit分为三个阶段， commit即将开始，commit，commit后
        //对应commitBeforeMutationEffects，commitMutationEffects，commitLayoutEffects

        if (firstEffect !== null) {

            //标记开始进行「before mutation」子阶段了
            //更新当前选中的DOM节点，一般为 document.activeElement || document.body

            nextEffect = firstEffect;
            //
            do {
                //调用的回调
                //调用classComponent 上的生命周期方法 getSnapshotBeforeUpdate
                //fiber的dom变化情况已经分析完毕，在commit到真实的dom之前，如果class组件有getSnapshotBeforeUpdate函数，
                //调用该函数，getSnapshotBeforeUpdate的返回值将做为componentDidUpdate的第三个参数
                //很少使用，主要用来获取dom的信息，如滚动条等
                //invokeGuardedCallback(null, commitBeforeMutationEffects, null);
                commitBeforeMutationEffects() //针对class组件，对组件的getSnapshotBeforeUpdate什么周期，进行处理、调用
            } while (nextEffect !== null);
            //


            nextEffect = firstEffect;
            //在这之前已经把root的内部html树结构迭代完成了firstEffect的child的statenode就是

            //一个effect,一个effect的commit.每一次的effect可能包含一大个DOM的修改。
            //每一次的appendChild或者inserbefore，都可能是一大块DOM。（在原来分析fiber的时候，就将子fiber的DOM插入了父fiber的dom树中。）
            //所以在commit操作阶段时，只需要一次DOM操作，将一大块DOM插入
            do {
                {
                    //关键点
                    //提交HostComponent的 side effect，也就是真实DOM节点的操作(增删改)
                    // invokeGuardedCallback(null, commitMutationEffects, null, root, renderPriorityLevel);
                    commitMutationEffects()

                }
            } while (nextEffect !== null);

            // The work-in-progress tree is now the current tree. This must come after
            // the mutation phase, so that the previous tree is still current during
            // componentWillUnmount, but before the layout phase, so that the finished
            // work is current during componentDidMount/Update.

            root.current = finishedWork; // The next phase is the layout phase, where we call effects that read
            // the host tree after it's been mutated. The idiomatic use case for this is
            // layout, but class component lifecycles also fire here for legacy reasons.
            nextEffect = firstEffect;

            do {
                {
                    //调用保护回调
                    //invokeGuardedCallback(null, commitLayoutEffects, null, root, expirationTime);
                    commitLayoutEffects()


                }
            } while (nextEffect !== null);

            nextEffect = null; // Tell Scheduler to yield at the end of the frame, so the browser has an
            // opportunity to paint.
        } else {
            // No effects.
            console.log("一般不进入这里的,怎么了！！！！！！")
        }
        return null;
    }


    //↓↓↓↓↓↓--------commitBeforeMutationEffects---------↓↓↓↓↓↓
    {
        //针对class组件，对组件的getSnapshotBeforeUpdate什么周期，进行处理、调用
        function commitBeforeMutationEffects() {
            while (nextEffect !== null) {
                var effectTag = nextEffect.effectTag;
                if ((effectTag & Snapshot) !== NoEffect) {
                    var current = nextEffect.alternate;
                    //针对class组件，对组件的getSnapshotBeforeUpdate什么周期，进行参数传递
                    commitBeforeMutationLifeCycles(current, nextEffect);
                }

                if ((effectTag & Passive) !== NoEffect) {
                    // If there are passive effects, schedule a callback to flush at
                    // the earliest opportunity.
                    /*
                    感觉是：getSnapshotBeforeUpdate函数有副作用时，去改变副作用
                    
                    if (!rootDoesHavePassiveEffects) {
                          rootDoesHavePassiveEffects = true;
                          scheduleCallback(NormalPriority, function () {
                              flushPassiveEffects();
                              return null;
                          });
                      }   
                    */

                }

                nextEffect = nextEffect.nextEffect;

            }
        }

        //针对class组件，对组件的getSnapshotBeforeUpdate什么周期，获取到commit渲染前一个状态的props和state
        function commitBeforeMutationLifeCycles(current, finishedWork) {
            switch (finishedWork.tag) {
                case FunctionComponent:
                case ForwardRef:
                case SimpleMemoComponent:
                case Block: {
                    return;
                }
                case ClassComponent: {
                    if (finishedWork.effectTag & Snapshot) {
                        if (current !== null) {
                            var prevProps = current.memoizedProps;
                            var prevState = current.memoizedState;

                            var instance = finishedWork.stateNode; // We could update instance props and state here,
                            // but instead we rely on them being set during last render.
                            // TODO: revisit this when we implement resuming.

                            //var snapshot = instance.getSnapshotBeforeUpdate(finishedWork.elementType === finishedWork.type ? prevProps : resolveDefaultProps(finishedWork.type, prevProps), prevState);
                            //getSnapshotBeforeUpdate什么周期，获取到commit渲染前一个状态的props和state
                            var snapshot = instance.getSnapshotBeforeUpdate(prevProps, prevState);

                            if (snapshot === undefined) {
                                console.error("getSnapshotBeforeUpdate必须有返回值");
                            }
                            instance.__reactInternalSnapshotBeforeUpdate = snapshot;
                        }
                    }

                    return;
                }
                case HostRoot:
                case HostComponent:
                case HostText:
                case HostPortal:
                case IncompleteClassComponent:
                    // Nothing to do for these component types
                    return;
            }
        }
    }
    //↑↑↑↑↑↑--------commitBeforeMutationEffects---------↑↑↑↑↑↑



    //↓↓↓↓↓↓--------commitMutationEffects---------↓↓↓↓↓↓
    {
        //提交突变效应
        function commitMutationEffects(root, renderPriorityLevel) {
            // 在这之前，root的数据结构关系，已经迭代完成
            //沿着effect链条，遍历整个链条，
            //对于第一次的render,effect链条上面将只有一个effect,将整个dom填充进入dom中
            //（不应该跟踪副作用 ，shouldTrackSideEffects都为false,）
            //只有fiber树的根结点会记录effect
            while (nextEffect !== null) {

                var effectTag = nextEffect.effectTag;

                //如果有文字节点，则将value 置为''
                if (effectTag & ContentReset) {
                    commitResetTextContent(nextEffect);
                }
                //将 ref 的指向置为 null
                if (effectTag & Ref) {
                    var current = nextEffect.alternate;

                    if (current !== null) {
                        commitDetachRef(current);
                    }
                } // The following switch statement is only concerned about placement,
                // updates, and deletions. To avoid needing to add a case for every possible
                // bitmap value, we remove the secondary effects from the effect tag and
                // switch on that value.


                //以下情况是针对 替换(Placement)、更新(Update)和 删除(Deletion) 的 effectTag 的
                var primaryEffectTag = effectTag & (Placement | Update | Deletion | Hydrating);

                switch (primaryEffectTag) {
                    //插入新节点
                    case Placement: { //2
                        //针对该节点及子节点进行插入操作
                        commitPlacement(nextEffect); // Clear the "placement" from effect tag so that we know that this is
                        // inserted, before any life-cycles like componentDidMount gets called.
                        // TODO: findDOMNode doesn't rely on this any more but isMounted does
                        // and isMounted is deprecated anyway so we should be able to kill this.

                        nextEffect.effectTag &= ~Placement;
                        break;
                    }

                    case PlacementAndUpdate: { //6
                        //第一次render
                        //针对该节点及子节点进行插入操作
                        // Placement
                        commitPlacement(nextEffect); // Clear the "placement" from effect tag so that we know that this is
                        // inserted, before any life-cycles like componentDidMount gets called.

                        nextEffect.effectTag &= ~Placement; // Update

                        var _current = nextEffect.alternate;
                        //对 DOM 节点上的属性进行更新
                        //对 DOM 节点上的属性进行更新
                        commitWork(_current, nextEffect);
                        break;
                    }

                    case Hydrating: { //1024
                        nextEffect.effectTag &= ~Hydrating;
                        break;
                    }

                    case HydratingAndUpdate: { //1028
                        nextEffect.effectTag &= ~Hydrating; // Update

                        var _current2 = nextEffect.alternate;
                        commitWork(_current2, nextEffect);
                        break;
                    }
                    //更新节点
                    //旧节点->新节点
                    case Update: { //4
                        var _current3 = nextEffect.alternate;
                        commitWork(_current3, nextEffect);
                        break;
                    }

                    case Deletion: { //8
                        //删除节点
                        commitDeletion(root, nextEffect, renderPriorityLevel);
                        break;
                    }
                } // TODO: Only record a mutation effect if primaryEffectTag is non-zero.


                //recordEffect();
                //resetCurrentFiber();
                nextEffect = nextEffect.nextEffect;
            }
        }



        //提交节点
        function commitPlacement(finishedWork) {

            console.log(finishedWork)

            //向上查找，返回是 DOM 元素的父节点(如果不是dom元素-如class元素就不是dom。继续往上找。HostComponent，HostRoot可以)
            var parentFiber = getHostParentFiber(finishedWork); // Note: these two variables *must* always be updated together.

            var parent;
            var isContainer;
            var parentStateNode = parentFiber.stateNode;

            switch (parentFiber.tag) {
                //如果是 DOM 元素的话
                case HostComponent:
                    //获取对应的 DOM 节点
                    parent = parentStateNode;
                    isContainer = false;
                    break;
                    //如果是 fiberRoot 节点的话，
                case HostRoot:
                    //根节点的存储在containerInfo属性中
                    //FiberRootNode.containerInfo就是#root 的dom结构
                    parent = parentStateNode.containerInfo;
                    isContainer = true;
                    break;

                case HostPortal:
                    parent = parentStateNode.containerInfo;
                    isContainer = true;
                    break;

                case FundamentalComponent:

                    // eslint-disable-next-line-no-fallthrough

                default: {
                    {
                        throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
                    }
                }

            }
            //如果父节点是文本节点的话
            if (parentFiber.effectTag & ContentReset) {
                // Reset the text content of the parent before doing any insertions
                //在进行任何插入操作前，需要先将 value 置为 ''
                resetTextContent(parent); // Clear ContentReset from the effect tag
                //再清除掉 ContentReset 这个 effectTag
                parentFiber.effectTag &= ~ContentReset;
            }
            //查找插入节点的位置，也就是获取它后一个 DOM 兄弟节点的位置
            var before = getHostSibling(finishedWork); // We only have the top Fiber that was inserted but we need to recurse down its
            // children to find all the terminal nodes.
            //我们只有插入的Fiber，但需要向下递归
            //子节点查找所有终端节点。

            console.log(before)
            if (isContainer) {
                //在节点parent内部插入node节点，如果插入节点不知末尾，则根据before节点insert
                insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
            } else {
                insertOrAppendPlacementNode(finishedWork, before, parent);
            }
        }


        //在container的子节点即beforeChild几点前面，插入child节点
        function insertInContainerBefore(container, child, beforeChild) {
            if (container.nodeType === COMMENT_NODE) {
                //不管
                container.parentNode.insertBefore(child, beforeChild);
            } else {
                container.insertBefore(child, beforeChild);
            }
        }

        //在container节点的子节点列表的末尾添加新的子节点。
        function appendChildToContainer(container, child) {

            var parentNode;

            if (container.nodeType === COMMENT_NODE) {
                //不管
                parentNode = container.parentNode;
                parentNode.insertBefore(child, container);
            } else {
                parentNode = container;
                parentNode.appendChild(child);
            } // This container might be used for a portal.
        }


        //在节点parent内部插入node节点，如果插入节点不知末尾，则根据before节点insert
        function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {

            var tag = node.tag;
            var isHost = tag === HostComponent || tag === HostText;

            if (isHost) {
                //stateNode是整理好的dom树结构，可以之间insert进dom中
                // var stateNode = isHost ? node.stateNode : node.stateNode.instance;
                var stateNode = node.stateNode

                if (before) {
                    insertInContainerBefore(parent, stateNode, before);
                } else {
                    appendChildToContainer(parent, stateNode);
                }
            } else if (tag === HostPortal) {

            } else {
                var child = node.child;

                if (child !== null) {
                    insertOrAppendPlacementNodeIntoContainer(child, before, parent);
                    var sibling = child.sibling;
                    while (sibling !== null) {
                        insertOrAppendPlacementNodeIntoContainer(sibling, before, parent);
                        sibling = sibling.sibling;
                    }
                }
            }
        }

        function insertOrAppendPlacementNode(node, before, parent) {
            var tag = node.tag;
            var isHost = tag === HostComponent || tag === HostText;

            if (isHost || enableFundamentalAPI) {
                var stateNode = isHost ? node.stateNode : node.stateNode.instance;

                if (before) {
                    insertBefore(parent, stateNode, before);
                } else {
                    appendChild(parent, stateNode);
                }
            } else if (tag === HostPortal);
            else {
                var child = node.child;

                if (child !== null) {
                    insertOrAppendPlacementNode(child, before, parent);
                    var sibling = child.sibling;

                    while (sibling !== null) {
                        insertOrAppendPlacementNode(sibling, before, parent);
                        sibling = sibling.sibling;
                    }
                }
            }
        }




        function commitWork(current, finishedWork) {

            switch (finishedWork.tag) {
                case FunctionComponent:
                    //case ForwardRef:
                    //case MemoComponent:
                    // case SimpleMemoComponent:
                    /*  case Block: {
                      
                       commitHookEffectListUnmount(Layout | HasEffect, finishedWork);
                       return;
                     } */

                case ClassComponent: {
                    return;
                }

                case HostComponent: {
                    var instance = finishedWork.stateNode;

                    if (instance != null) {
                        // Commit the work prepared earlier.
                        var newProps = finishedWork.memoizedProps; // For hydration we reuse the update path but we treat the oldProps
                        // as the newProps. The updatePayload will contain the real change in
                        // this case.

                        var oldProps = current !== null ? current.memoizedProps : newProps;
                        var type = finishedWork.type; // TODO: Type the updateQueue to be specific to host components.

                        var updatePayload = finishedWork.updateQueue;
                        finishedWork.updateQueue = null;

                        if (updatePayload !== null) {
                            commitUpdate(instance, updatePayload, type, oldProps, newProps);
                        }
                    }

                    return;
                }

                case HostText: {
                    if (!(finishedWork.stateNode !== null)) {
                        {
                            throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
                        }
                    }

                    var textInstance = finishedWork.stateNode;
                    var newText = finishedWork.memoizedProps; // For hydration we reuse the update path but we treat the oldProps
                    // as the newProps. The updatePayload will contain the real change in
                    // this case.

                    var oldText = current !== null ? current.memoizedProps : newText;
                    commitTextUpdate(textInstance, oldText, newText);
                    return;
                }

                case HostRoot: {
                    {
                        var _root = finishedWork.stateNode;
                        /*  if (_root.hydrate) {
                             // We've just hydrated. No need to hydrate again.
                             _root.hydrate = false;
                             commitHydratedContainer(_root.containerInfo);
                         } */
                    }

                    return;
                }

                case Profiler: {
                    return;
                }

                case SuspenseComponent: {
                    // commitSuspenseComponent(finishedWork);
                    // attachSuspenseRetryListeners(finishedWork);
                    return;
                }

                case SuspenseListComponent: {
                    // attachSuspenseRetryListeners(finishedWork);
                    return;
                }

                case IncompleteClassComponent: {
                    return;
                }
            }
        }


        function commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
            // Update the props handle so that we know which props are the ones with
            // with current event handlers.
            // Apply the diff to the DOM node.

            domElement.__reactEventHandlers = newProps

            updateProperties(domElement, updatePayload, type, oldProps, newProps);
        }
    }
    //↑↑↑↑↑↑--------commitMutationEffects---------↑↑↑↑↑↑


    //↓↓↓↓↓↓--------commitLayoutEffects---------↓↓↓↓↓↓
    {
        function commitLayoutEffects(root, committedExpirationTime) {
            //
            // TODO: Should probably move the bulk of this function to commitWork.
            while (nextEffect !== null) {

                var effectTag = nextEffect.effectTag;

                if (effectTag & (Update | Callback)) {

                    var current = nextEffect.alternate;
                    commitLifeCycles(root, current, nextEffect);
                }

                if (effectTag & Ref) {
                    //recordEffect();
                    commitAttachRef(nextEffect);
                }

                nextEffect = nextEffect.nextEffect;
            }
        }


        function commitLifeCycles(finishedRoot, current, finishedWork, committedExpirationTime) {
            switch (finishedWork.tag) {
                /*  case FunctionComponent:
                 case ForwardRef:
                 case SimpleMemoComponent:
                 case Block: {
                   // At this point layout effects have already been destroyed (during mutation phase).
                   // This is done to prevent sibling component effects from interfering with each other,
                   // e.g. a destroy function in one component should never override a ref set
                   // by a create function in another component during the same commit.
                   // commitHookEffectListMount(Layout | HasEffect, finishedWork);
        
                   return;
                 } */

                case ClassComponent: {
                    var instance = finishedWork.stateNode;

                    if (finishedWork.effectTag & Update) {
                        if (current === null) {
                            instance.componentDidMount();
                        } else {
                            var prevProps = finishedWork.elementType === finishedWork.type ? current.memoizedProps : resolveDefaultProps(finishedWork.type, current.memoizedProps);
                            var prevState = current.memoizedState;
                            instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
                        }
                    }

                    var updateQueue = finishedWork.updateQueue;

                    if (updateQueue !== null) {

                        commitUpdateQueue(finishedWork, updateQueue, instance);
                    }

                    return;
                }

                case HostRoot: {
                    var _updateQueue = finishedWork.updateQueue;

                    if (_updateQueue !== null) {
                        var _instance = null;

                        if (finishedWork.child !== null) {
                            switch (finishedWork.child.tag) {
                                case HostComponent:
                                    _instance = getPublicInstance(finishedWork.child.stateNode);
                                    break;

                                case ClassComponent:
                                    _instance = finishedWork.child.stateNode;
                                    break;
                            }
                        }

                        commitUpdateQueue(finishedWork, _updateQueue, _instance);
                    }

                    return;
                }

                case HostComponent: {
                    var _instance2 = finishedWork.stateNode; // Renderers may schedule work to be done after host components are mounted
                    // (eg DOM renderer may schedule auto-focus for inputs and form controls).
                    // These effects should only be committed when components are first mounted,
                    // aka when there is no current/alternate.

                    if (current === null && finishedWork.effectTag & Update) {
                        var type = finishedWork.type;
                        var props = finishedWork.memoizedProps;
                        commitMount(_instance2, type, props);
                    }

                    return;
                }

                case HostText: {
                    // We have no life-cycles associated with text.
                    return;
                }
            }
        }

        function callCallback(callback, context) {
            if (!(typeof callback === 'function')) {
                {
                    throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + callback);
                }
            }

            callback.call(context);
        }

        function commitUpdateQueue(finishedWork, finishedQueue, instance) {
            // Commit the effects
            var effects = finishedQueue.effects;
            finishedQueue.effects = null;

            if (effects !== null) {
                for (var i = 0; i < effects.length; i++) {
                    var effect = effects[i];
                    var callback = effect.callback;

                    if (callback !== null) {
                        effect.callback = null;
                        callCallback(callback, instance);
                    }
                }
            }
        }

        function commitMount(domElement, type, newProps, internalInstanceHandle) {
            // Despite the naming that might imply otherwise, this method only
            // fires if there is an `Update` effect scheduled during mounting.
            // This happens if `finalizeInitialChildren` returns `true` (which it
            // does to implement the `autoFocus` attribute on the client). But
            // there are also other cases when this might happen (such as patching
            // up text content during hydration mismatch). So we'll check this again.
            if (shouldAutoFocusHostComponent(type, newProps)) {
                domElement.focus();
            }
        }

        function commitAttachRef(finishedWork) {
            var ref = finishedWork.ref;

            if (ref !== null) {
                var instance = finishedWork.stateNode;
                var instanceToUse = instance;

                if (typeof ref === 'function') {
                    ref(instanceToUse);
                } else {
                    ref.current = instanceToUse;
                }
            }
        }

    }

    //↑↑↑↑↑↑--------commitLayoutEffects---------↑↑↑↑↑↑

}
//↑↑↑↑↑↑--------finishSyncRender---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------completeUnitOfWork---------↓↓↓↓↓↓
{

    /**
     * 
     * 
     * 在beginwork执行后，workInProgress的child节点为null时，执行completeUnitOfWork程序。
     * 
     * completeWork
     * completeUnitOfWork从叶子节点开始，回溯到根目录。
     * 1，将当前workInProgress的fiber节点DOM化。及使用createElement生成元素，并添加进入当前fiber节点的stateNode中。
     * 重复遍历的节点并不会重复渲染，而是为了取到下一个可能需要渲染的节点。
     * 2，遍历当前fiber节点的props，按情况操作。如children，就append。
     * 3，appendAllChildren查阅当前fiber节点的子元素，如果子元素不是原生标签而是Class组件等，查看他的孙元素。最终将后辈dom化的元素树追加进入自己的DOM结构中。
     * 4，返回当前workInProgress的父亲节点。继续执行1，
     * 执行过程：
     * 
     * 
     * effect链
     * 按照深度优先，广度落后的权重原则，构建 effect 链，供 commitRoot 提交阶段使用
     * 
     * 
     * 
     * 
     */

    function completeUnitOfWork(unitOfWork) {

        /**
         *1、根据是否中断调用不同的处理方法
         *2、判断是否有兄弟节点来执行不同的操作
         *3、完成节点之后赋值effect链 
         */
        //改变workInProgress工作节点的值为unitOfWork，这里unitOfWork为叶子节点-fiber

        workInProgress = unitOfWork;

        //从叶子结点开始。通过return返回父节点，一点点开始回溯，构建DOM树
        //
        do {
            var current = workInProgress.alternate;
            var returnFiber = workInProgress.return;
            var next = void 0;
            //完成当前fiber结点的dom化操作
            //在我这里，next一定是null
            //生成结点，并把后面的dom信息挂在自己的的dom上
            next = completeWork(current, workInProgress, renderExpirationTime = null)
            //resetChildExpirationTime(workInProgress);
            /*
            //一定是null
             if (next !== null) {
                // Completing this fiber spawned new work. Work on that next.
                return next;
            } 
            */

            // 构建 effect 链，供 commitRoot 提交阶段使用
            /*            
                针对一个fiber节点， 构造effect链条。
                1， 首先将自己的effect链条， 挂在父节点的effect链条的后面（ 如果父节点没有链条， 相当于， 自己的effect链条会是父节点最前面的链条）
                2， 如果fiber节点本身有副作用， 即fiber.effectTag > PerformedWork。 那么， 将自己挂到父节点的effect链条的最后面面
                3， 如果当前节点还有有弟弟节点， 继续completeWork， 然后执行1、 2、 3
                4， 返回当前节点的父节点， 继续这个分析。

                最先挂在的出现在effect链条的最前面
                深度优先，广度落后。即，层次更深的节点一定再更前面（不考虑广度）。兄节点一定比弟节点更前面（这是广度）。
           

            
            对于下面这种dom结构，假设全部发生effect变化
            render() {
                return (
                    <div index={"链条6"}>
                        <div index={"链条5"}>
                            <div index={"链条3"}>
                                <div index={"链条1"} >1</div>
                                <div index={"链条2"} >2</div>
                            </div>
                            <div index={"链条4"} />
                        </div>
                    </div>
                )
            }
            它的effect链条将是，链条1->链条2->链条3->链条4->链条5->链条6
            排序权重：深度优先，广度落后。
            权重最高的在最前面。
            */


            /* 
            第一次render时，除了fiberHost节点其他都不追加副作用，副作用主要用来Diff操作的

            第一次render时 除去fiber树的第一个节点,其他节点为 current指fiber.alternate，一定为null
            if (current === null) {
                不应该跟踪副作用 ，shouldTrackSideEffects都为false，
                workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
            } else {
                setstate 或forceUpdate时，fiber树的第一个节点即fiberHost节点
                跟踪副作用 ，shouldTrackSideEffects都为true，
                workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
            }
            */

            if (returnFiber !== null && // Do not append effects to parents if a sibling failed to complete
                (returnFiber.effectTag & Incomplete) === NoEffect) {
                //   NoEffect为0
                // (returnFiber.effectTag & Incomplete) === NoEffect 一般都是成立的。
                //只有在returnFiber.effectTag也是Incomplete时，即fiber还没有完成时，还不会成立。

                // Append all the effects of the subtree and this fiber onto the effect
                // list of the parent. The completion order of the children affects the
                // side-effect order.

                //把自己身上的挂载的effect链粘在父节点的effect链条后面
                //通过firstEffect，nextEffect，lastEffect，将当前节点和父节点的effect链条链接在一起
                //将自己的effect链条粘链在effect链条的后面。
                //距离根节点越近fiber的effect，在链条上越靠前。

                if (returnFiber.firstEffect === null) {
                    returnFiber.firstEffect = workInProgress.firstEffect;
                }

                if (workInProgress.lastEffect !== null) {
                    if (returnFiber.lastEffect !== null) {
                        returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
                    }

                    returnFiber.lastEffect = workInProgress.lastEffect;
                }
                // If this fiber had side-effects, we append it AFTER the children's
                // side-effects. We can perform certain side-effects earlier if needed,
                // by doing multiple passes over the effect list. We don't want to
                // schedule our own side-effect on our own list because if end up
                // reusing children we'll schedule this effect onto itself since we're
                // at the end.


                var effectTag = workInProgress.effectTag;
                // Skip both NoWork and PerformedWork tags when creating the effect
                // list. PerformedWork effect is read by React DevTools but shouldn't be
                // committed.

                // 如果自己本身也有effect ，那么要把自己也加入父节点的effect链上，在effect链条的最后面
                if (effectTag > PerformedWork) {
                    if (returnFiber.lastEffect !== null) {
                        returnFiber.lastEffect.nextEffect = workInProgress;
                    } else {
                        returnFiber.firstEffect = workInProgress;
                    }
                    returnFiber.lastEffect = workInProgress;
                }
            }

            var siblingFiber = workInProgress.sibling;
            // 有兄弟节点返回兄弟节点，继续走beinWork
            if (siblingFiber !== null) {
                // If there is more work to do in this returnFiber, do that next.
                return siblingFiber;
            }
            // Otherwise, return to the parent
            workInProgress = returnFiber;
        } while (workInProgress !== null)
        return null;
    }

    /**
     * 如果fiber节点的是div,span，文本等客户端节点时
     * 生成相应的Dom，挂载在workInProgress.stateNode 上面。即workInProgress.stateNode = instance;;
     * 并将它的子元素Dom情况插入自身
     * 设置dom元素的属性，如style,txt，等等属性
     */
    function completeWork(current, workInProgress, renderExpirationTime) {

        var newProps = workInProgress.pendingProps;
        switch (workInProgress.tag) {
            case ClassComponent: {
                var Component = workInProgress.type;
                return null;
            }
            case HostRoot: {
                return null;
            }
            case HostComponent: {
                //对于浏览器端的元素
                /**
                 * 1，创建元素 -createElement
                 * 2, 查询自己的孙元素，曾孙元素等，若找到了DOM化的结构，鉴插入自己（parent）的DOM结构中
                 * 3，设置元素的属性，如style,txt，等等属性
                 */
                //popHostContext(workInProgress);
                //var rootContainerInstance = getRootHostContainer();

                if (current !== null && workInProgress.stateNode != null) {
                    //updateHostComponent$1(current, workInProgress, type, newProps, rootContainerInstance);
                } else {
                    var rootContainerInstance = document;
                    var type = workInProgress.type;

                    //创建元素 -createElement
                    var instance = createInstance(type, newProps, rootContainerInstance, currentHostContext = null, workInProgress);

                    //2, 查询自己的孙元素，曾孙元素等，若找到了DOM化的结构，鉴插入自己（parent）的DOM结构中
                    //appendAllChildren查阅当前fiber节点的子元素，如果子元素不是原生标签而是Class组件等，查看他的孙元素。最终将后辈dom化的元素树追加进入自己的DOM结构中。
                    appendAllChildren(instance, workInProgress, false, false);
                    // This needs to be set before we mount Flare event listeners
                    workInProgress.stateNode = instance;
                    // (eg DOM renderer supports auto-focus for certain elements).
                    // Make sure such renderers get scheduled for later work.

                    //对 DomElement 的属性进行初始化，而<code>节点的文字内容、样式、class、事件 Handler等等也是这个时候存放进去的。
                    if (finalizeInitialChildren(instance, type, newProps, rootContainerInstance)) {
                        //标记更新副作用
                        markUpdate(workInProgress);
                    }
                }
                return null;


            }
            case HostText: {
                var newText = newProps;

                if (current && workInProgress.stateNode != null) {
                    var oldText = current.memoizedProps;
                    // If we have an alternate, that means this is an update and we need
                    // to schedule a side-effect to do the updates.
                    if (oldText !== newText) {
                        //标记更新副作用
                        markUpdate(workInProgress);
                    }
                }

                workInProgress.stateNode = createTextInstance(newText);
                return null;
            }

        }

        return null
    }

    //创建元素-createElement，就是 createElement函数，包装了一下而已
    function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
        //
        var domElement = createElement(type, props, rootContainerInstance, parentNamespace = null);
        domElement.__reactEventHandlers = props;
        return domElement;
    }

    //创建元素-createElement
    function createElement(type, props, rootContainerElement, parentNamespace) {

        domElement = document.createElement(type);
        return domElement;
    }

    //将child插入parentInstance的结构中 ---appendChild
    function appendInitialChild(parentInstance, child) {
        parentInstance.appendChild(child);
    }

    //2, 查询自己的后代元素，若找到了DOM化的结构，鉴插入自己（parent）的DOM结构中，然后终止查找。
    //找到第一个dom插入自己，相当于，后代元素都插入了自己dom中
    function appendAllChildren(parent, workInProgress, ) {
        //We only have the top Fiber that was created but we need recurse down its
        //children to find all the terminal nodes.
        var node = workInProgress.child;
        while (node !== null) {
            //寻找DOM化的子元素
            if (node.tag === HostComponent || node.tag === HostText) {
                //将node.stateNode结构插入parent结构中
                appendInitialChild(parent, node.stateNode);
            } else if (node.tag === HostPortal) {

            } else if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
            }
            if (node === workInProgress) {
                return;
            }

            while (node.sibling === null) {
                if (node.return === null || node.return === workInProgress) {
                    return;
                }
                node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
        }
    };

    /**
     * 对 DomElement 的属性进行初始化，
     * 如<code>节点的文字内容、样式、class、事件 Handler等等也是这个时候存放进去的
     * 
     */
    function setInitialProperties(domElement, tag, rawProps, rootContainerElement) {
        //通过setInitialProperties方法对 DomElement 的属性进行初始化，而<code>节点的内容、样式、class、事件 Handler等等也是这个时候存放进去的

        //判断是不是客户端的元素
        var isCustomComponentTag = isCustomComponent(tag, rawProps);
        var props;

        switch (tag) {
            default:
                props = rawProps;
        }

        //assertValidProps(tag, props);
        setInitialDOMProperties(tag, domElement, rootContainerElement, props, isCustomComponentTag);

        switch (tag) {
            default:

                break;
        }

    }
    // Calculate the diff between the two objects.

    function setInitialDOMProperties(tag, domElement, rootContainerElement, nextProps, isCustomComponentTag) {
        for (var propKey in nextProps) {
            if (!nextProps.hasOwnProperty(propKey)) {
                continue;
            }
            var nextProp = nextProps[propKey];
            if (propKey === "style") {
                {
                    if (nextProp) {
                        // Freeze the next style object so that we can assume it won't be
                        // mutated. We have already warned for this in the past.
                        Object.freeze(nextProp);
                    }
                } // Relies on `updateStylesByID` not mutating `styleUpdates`.

                setValueForStyles(domElement, nextProp);
            } else if (propKey === "dangerouslySetInnerHTML") {
                var nextHtml = nextProp ? nextProp[HTML$1] : undefined;

                if (nextHtml != null) {
                    //setInnerHTML(domElement, nextHtml);
                    domElement.innerHTML = nextHtml;
                }
            } else if (propKey === 'children') {
                if (typeof nextProp === 'string') {
                    // Avoid setting initial textContent when the text is empty. In IE11 setting
                    // textContent on a <textarea> will cause the placeholder to not
                    // show within the <textarea> until it has been focused and blurred again.
                    // https://github.com/facebook/react/issues/6731#issuecomment-254874553
                    var canSetTextContent = tag !== 'textarea' || nextProp !== '';

                    if (canSetTextContent) {
                        setTextContent(domElement, nextProp);
                    }
                } else if (typeof nextProp === 'number') {
                    setTextContent(domElement, '' + nextProp);
                }
                //} else if (registrationNameModules.hasOwnProperty(propKey)) {
            } else if (propKey == "onClick") {
                debugger
                if (nextProp != null) {
                    /* if (typeof nextProp !== 'function') {
                      warnForInvalidEventListener(propKey, nextProp);
                    } */
                    debugger
                    ensureListeningTo(rootContainerElement, propKey);
                }
            }
        }
    }


    function shouldAutoFocusHostComponent(type, props) {
        switch (type) {
            case 'button':
            case 'input':
            case 'select':
            case 'textarea':
                return !!props.autoFocus;
        }

        return false;
    }

    function finalizeInitialChildren(domElement, type, props, rootContainerInstance, hostContext) {
        setInitialProperties(domElement, type, props, rootContainerInstance);
        return shouldAutoFocusHostComponent(type, props);
    }
    //标记更新副作用
    function markUpdate(workInProgress) {
        // Tag the fiber with an update effect. This turns a Placement into
        // a PlacementAndUpdate.
        workInProgress.effectTag |= Update;
    }
}
//↑↑↑↑↑↑--------completeUnitOfWork---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------reconcileChildren---------↓↓↓↓↓↓
{

    function reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime) {
        //第一次render时，fiber树的第一个节点--fiberHost节点，current一定为true
        // 第一次render时 除去fiber树的第一个节点,其他节点为 current指fiber.alternate.current一定为null
        //（fiber树的第一个节点--fiberHost节点，指定了alternate,在 legacyCreateRootFromDOMContainer函数中 uninitializedFiber.stateNode = root;这里的root就是fiber树的坑位）
        //因为第一次render时，还没用渲染过，所以在当前这个时间点之前，alternate一定时null
        //current就是fiber.alternate

        if (current === null) {
            //不应该跟踪副作用 ，shouldTrackSideEffects都为false，
            workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
        } else {
            //setstate 或forceUpdate时，fiber树的第一个节点即fiberHost节点
            //跟踪副作用 ，shouldTrackSideEffects都为true，
            workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
        }
    }

    var reconcileChildFibers = ChildReconciler(true); //追踪副作用 ,形成 effect链
    var mountChildFibers = ChildReconciler(false); //不追踪副作用

    //分析、调和子元素，依据子元素情况生成fiber节点
    function ChildReconciler(shouldTrackSideEffects) {

        // 第一次render时，除了fiber树的第一个节点，shouldTrackSideEffects都为false，不应该跟踪副作用


        function deleteChild(returnFiber, childToDelete) {
            if (!shouldTrackSideEffects) {
                // Noop.
                return;
            } // Deletions are added in reversed order so we add it to the front.
            // At this point, the return fiber's effect list is empty except for
            // deletions, so we can just append the deletion to the list. The remaining
            // effects aren't added until the complete phase. Once we implement
            // resuming, this may not be true.


            var last = returnFiber.lastEffect;

            if (last !== null) {
                last.nextEffect = childToDelete;
                returnFiber.lastEffect = childToDelete;
            } else {
                returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
            }

            childToDelete.nextEffect = null;
            childToDelete.effectTag = Deletion;
        }

        function deleteRemainingChildren(returnFiber, currentFirstChild) {
            if (!shouldTrackSideEffects) {
                // Noop.
                return null;
            } // TODO: For the shouldClone case, this could be micro-optimized a bit by
            // assuming that after the first child we've already added everything.


            var childToDelete = currentFirstChild;

            while (childToDelete !== null) {
                deleteChild(returnFiber, childToDelete);
                childToDelete = childToDelete.sibling;
            }

            return null;
        }


        /**
         * 在fiber节点上记录副作用“Placement”，放置，安排元素
         * 并返回该fiber        
         */
        function placeSingleChild(newFiber) {
            // This is simpler for the single child case. We only need to do a
            // placement for inserting new children.

            if (shouldTrackSideEffects && newFiber.alternate === null) {
                newFiber.effectTag = Placement;
            }

            return newFiber;
        }

        function useFiber(fiber, pendingProps) {
            // We currently set sibling to null and index to 0 here because it is easy
            // to forget to do before returning it. E.g. for the single child case.
            var clone = createWorkInProgress(fiber, pendingProps);
            clone.index = 0;
            clone.sibling = null;
            return clone;
        }

        function placeChild(newFiber, lastPlacedIndex, newIndex) {
            newFiber.index = newIndex;

            if (!shouldTrackSideEffects) {
                // Noop.
                return lastPlacedIndex;
            }

            var current = newFiber.alternate;

            if (current !== null) {
                var oldIndex = current.index;

                if (oldIndex < lastPlacedIndex) {
                    // This is a move.
                    newFiber.effectTag = Placement;
                    return lastPlacedIndex;
                } else {
                    // This item can stay in place.
                    return oldIndex;
                }
            } else {
                // This is an insertion.
                newFiber.effectTag = Placement;
                return lastPlacedIndex;
            }
        }


        /**
         * 针对单个子元素的分析和调和
         * 根据这个单个子元素的情况，生成一个fiber,并返回
         */
        function reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
            var key = element.key;
            var child = currentFirstChild;
            //根据这个单个子元素的情况，生成一个fiber
            var _created4 = createFiberFromElement(element, returnFiber.mode, expirationTime);
            _created4.return = returnFiber;
            return _created4;
        }

        function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, expirationTime) {

            var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
            created.return = returnFiber;

            return created;
        }

        function updateTextNode(returnFiber, current, textContent, expirationTime) {
            if (current === null || current.tag !== HostText) {
                // Insert
                var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
                created.return = returnFiber;
                return created;
            } else {
                // Update
                var existing = useFiber(current, textContent);
                existing.return = returnFiber;
                return existing;
            }
        }

        function updateElement(returnFiber, current, element, expirationTime) {
            if (current !== null) {
                if (current.elementType === element.type || ( // Keep this check inline so it only runs on the false path:
                        isCompatibleFamilyForHotReloading(current, element))) {
                    // Move based on index
                    var existing = useFiber(current, element.props);
                    //existing.ref = coerceRef(returnFiber, current, element);
                    existing.return = returnFiber;
                    return existing;
                }
            } // Insert


            var created = createFiberFromElement(element, returnFiber.mode, expirationTime);
            // created.ref = coerceRef(returnFiber, current, element);
            created.return = returnFiber;
            return created;
        }

        function updatePortal(returnFiber, current, portal, expirationTime) {
            if (current === null || current.tag !== HostPortal || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) {
                // Insert
                var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
                created.return = returnFiber;
                return created;
            } else {
                // Update
                var existing = useFiber(current, portal.children || []);
                existing.return = returnFiber;
                return existing;
            }
        }

        function updateFragment(returnFiber, current, fragment, expirationTime, key) {
            if (current === null || current.tag !== Fragment) {
                // Insert
                var created = createFiberFromFragment(fragment, returnFiber.mode, expirationTime, key);
                created.return = returnFiber;
                return created;
            } else {
                // Update
                var existing = useFiber(current, fragment);
                existing.return = returnFiber;
                return existing;
            }
        }

        function createChild(returnFiber, newChild, expirationTime) {
            if (typeof newChild === 'string' || typeof newChild === 'number') {
                // Text nodes don't have keys. If the previous node is implicitly keyed
                // we can continue to replace it without aborting even if it is not a text
                // node.
                var created = createFiberFromText('' + newChild, returnFiber.mode, expirationTime);
                created.return = returnFiber;
                return created;
            }

            if (typeof newChild === 'object' && newChild !== null) {
                switch (newChild.$$typeof) {
                    case REACT_ELEMENT_TYPE: {
                        var _created = createFiberFromElement(newChild, returnFiber.mode, expirationTime);

                        //_created.ref = coerceRef(returnFiber, null, newChild);
                        _created.return = returnFiber;
                        return _created;
                    }
                    /*  case REACT_PORTAL_TYPE: {
                         var _created2 = createFiberFromPortal(newChild, returnFiber.mode, expirationTime);
    
                         _created2.return = returnFiber;
                         return _created2;
                     } */
                }
                if (isArray$1(newChild)) {
                    var _created3 = createFiberFromFragment(newChild, returnFiber.mode, expirationTime, null);

                    _created3.return = returnFiber;
                    return _created3;
                }
            }

            /* {
                if (typeof newChild === 'function') {
                    warnOnFunctionType();
                }
            } */

            return null;
        }

        function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
            if (typeof newChild === 'string' || typeof newChild === 'number') {
                // Text nodes don't have keys, so we neither have to check the old nor
                // new node for the key. If both are text nodes, they match.
                var matchedFiber = existingChildren.get(newIdx) || null;
                return updateTextNode(returnFiber, matchedFiber, '' + newChild, expirationTime);
            }

            if (typeof newChild === 'object' && newChild !== null) {
                switch (newChild.$$typeof) {
                    case REACT_ELEMENT_TYPE: {
                        var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;

                        if (newChild.type === REACT_FRAGMENT_TYPE) {
                            return updateFragment(returnFiber, _matchedFiber, newChild.props.children, expirationTime, newChild.key);
                        }

                        return updateElement(returnFiber, _matchedFiber, newChild, expirationTime);
                    }

                    /*  case REACT_PORTAL_TYPE: {
                         var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
    
                         return updatePortal(returnFiber, _matchedFiber2, newChild, expirationTime);
                     } */
                }

                if (isArray$1(newChild)) {
                    var _matchedFiber3 = existingChildren.get(newIdx) || null;

                    return updateFragment(returnFiber, _matchedFiber3, newChild, expirationTime, null);
                }
            }
            /* {
                if (typeof newChild === 'function') {
                    warnOnFunctionType();
                }
            }
     */
            return null;
        }

        function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
            // Update the fiber if the keys match, otherwise return null.
            var key = oldFiber !== null ? oldFiber.key : null;

            if (typeof newChild === 'string' || typeof newChild === 'number') {
                // Text nodes don't have keys. If the previous node is implicitly keyed
                // we can continue to replace it without aborting even if it is not a text
                // node.
                if (key !== null) {
                    return null;
                }

                return updateTextNode(returnFiber, oldFiber, '' + newChild, expirationTime);
            }

            if (typeof newChild === 'object' && newChild !== null) {
                switch (newChild.$$typeof) {
                    case REACT_ELEMENT_TYPE: {
                        if (newChild.key === key) {
                            /* if (newChild.type === REACT_FRAGMENT_TYPE) {
                                return updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key);
                            } */

                            return updateElement(returnFiber, oldFiber, newChild, expirationTime);
                        } else {
                            return null;
                        }
                    }

                    /* case REACT_PORTAL_TYPE: {
                        if (newChild.key === key) {
                            return updatePortal(returnFiber, oldFiber, newChild, expirationTime);
                        } else {
                            return null;
                        }
                    } */
                }

                // if (isArray$1(newChild) || getIteratorFn(newChild)) {
                if (isArray$1(newChild)) {
                    if (key !== null) {
                        return null;
                    }

                    return updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
                }


            }


            return null;
        }

        function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {

            var resultingFirstChild = null;
            var previousNewFiber = null;
            var oldFiber = currentFirstChild;
            var lastPlacedIndex = 0;
            var newIdx = 0;
            var nextOldFiber = null;

            for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
                if (oldFiber.index > newIdx) {
                    nextOldFiber = oldFiber;
                    oldFiber = null;
                } else {
                    nextOldFiber = oldFiber.sibling;
                }

                var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);

                if (newFiber === null) {
                    // TODO: This breaks on empty slots like null children. That's
                    // unfortunate because it triggers the slow path all the time. We need
                    // a better way to communicate whether this was a miss or null,
                    // boolean, undefined, etc.
                    if (oldFiber === null) {
                        oldFiber = nextOldFiber;
                    }

                    break;
                }

                if (shouldTrackSideEffects) {
                    if (oldFiber && newFiber.alternate === null) {
                        // We matched the slot, but we didn't reuse the existing fiber, so we
                        // need to delete the existing child.
                        deleteChild(returnFiber, oldFiber);
                    }
                }

                lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);

                if (previousNewFiber === null) {
                    // TODO: Move out of the loop. This only happens for the first run.
                    resultingFirstChild = newFiber;
                } else {
                    // TODO: Defer siblings if we're not at the right index for this slot.
                    // I.e. if we had null values before, then we want to defer this
                    // for each null value. However, we also don't want to call updateSlot
                    // with the previous one.
                    previousNewFiber.sibling = newFiber;
                }

                previousNewFiber = newFiber;
                oldFiber = nextOldFiber;
            }

            if (newIdx === newChildren.length) {
                // We've reached the end of the new children. We can delete the rest.
                deleteRemainingChildren(returnFiber, oldFiber);
                return resultingFirstChild;
            }

            if (oldFiber === null) {
                // If we don't have any more existing children we can choose a fast path
                // since the rest will all be insertions.
                for (; newIdx < newChildren.length; newIdx++) {
                    var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);

                    if (_newFiber === null) {
                        continue;
                    }

                    lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);

                    if (previousNewFiber === null) {
                        // TODO: Move out of the loop. This only happens for the first run.
                        resultingFirstChild = _newFiber;
                    } else {
                        previousNewFiber.sibling = _newFiber;
                    }

                    previousNewFiber = _newFiber;
                }

                return resultingFirstChild;
            } // Add all children to a key map for quick lookups.


            var existingChildren = mapRemainingChildren(returnFiber, oldFiber); // Keep scanning and use the map to restore deleted items as moves.

            for (; newIdx < newChildren.length; newIdx++) {
                var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);

                if (_newFiber2 !== null) {
                    if (shouldTrackSideEffects) {
                        if (_newFiber2.alternate !== null) {
                            // The new fiber is a work in progress, but if there exists a
                            // current, that means that we reused the fiber. We need to delete
                            // it from the child list so that we don't add it to the deletion
                            // list.
                            existingChildren.delete(_newFiber2.key === null ? newIdx : _newFiber2.key);
                        }
                    }

                    lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);

                    if (previousNewFiber === null) {
                        resultingFirstChild = _newFiber2;
                    } else {
                        previousNewFiber.sibling = _newFiber2;
                    }
                    previousNewFiber = _newFiber2;
                }
            }

            if (shouldTrackSideEffects) {
                // Any existing children that weren't consumed above were deleted. We need
                // to add them to the deletion list.
                existingChildren.forEach(function (child) {
                    return deleteChild(returnFiber, child);
                });
            }

            return resultingFirstChild;
        }

        //分析、调和子元素，依据子元素情况生成fiber节点，并返回
        function reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
            //根据子元素的类型，进行对象的处理
            //如：类、数组、文本，改怎么判断和处理
            var isObject = typeof newChild === 'object' && newChild !== null;
            //子元素是对象时
            //判断子元素的类型
            if (isObject) {
                switch (newChild.$$typeof) {
                    // 子元素是React元素时
                    case REACT_ELEMENT_TYPE:
                        //根据子元素的情况，生成子元素的fiber节点，并在子fiber节点上记录是否有副作用
                        //第一次render时，fiber树的第一个节点即fiberHost节点，要记录副作用，其他节点不纪录
                        //返回生成的子元素子节点
                        return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime));
                }
            }

            if (typeof newChild === 'string' || typeof newChild === 'number') {
                return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, expirationTime));
            }

            if (Array.isArray(newChild)) {
                console.log(newChild)
                return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
            }

            return deleteRemainingChildren(returnFiber, currentFirstChild);


        }

        return reconcileChildFibers;
    }


    function forceUnmountCurrentAndReconcile(current, workInProgress, nextChildren, renderExpirationTime) {

        // This function is fork of reconcileChildren. It's used in cases where we
        // want to reconcile without matching against the existing set. This has the
        // effect of all current children being unmounted; even if the type and key
        // are the same, the old child is unmounted and a new child is created.
        //
        // To do this, we're going to go through the reconcile algorithm twice. In
        // the first pass, we schedule a deletion for all the current children by
        // passing null.
        workInProgress.child = reconcileChildFibers(workInProgress, current.child, null, renderExpirationTime);
        // In the second pass, we mount the new children. The trick here is that we
        // pass null in place of where we usually pass the current child set. This has
        // the effect of remounting all children regardless of whether their
        // identities match.

        workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
    }

}
//↑↑↑↑↑↑--------reconcileChildren---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------beginWork---------↓↓↓↓↓↓
{

    /**
     * current指fiber树上，当前分析到的fiber节点
     * workInProgress据是根据current创建的工作单元，可以成为一个中间代理单元
     * 
     * beginWork根据workInProgress.tag采取不同的处理测虐
     * 
     * HostRoot: //3  fiber根节点
     * ClassComponent: //1  class组件节点
     * HostComponent: //5  客户端元素节点
     * HostText: //6  文本元素节点
     * 
     * 还有其他的节点
     * 
     * 返回根据子元素情况，创建的fiber
     */

    function beginWork(current, workInProgress) {
        //这里我随意指定一个时间
        let renderExpirationTime = 0;
        //console.log("workInProgress.tag---", workInProgress.tag)
        switch (workInProgress.tag) {
            case ClassComponent: //1
                //fiber.type 和fiber.elementType 一般都是一样的
                var _Component2 = workInProgress.type;
                var _unresolvedProps = workInProgress.pendingProps;
                var _resolvedProps = workInProgress.elementType === _Component2 ? _unresolvedProps : resolveDefaultProps(_Component2, _unresolvedProps);
                return updateClassComponent(current, workInProgress, _Component2, _resolvedProps, renderExpirationTime);
            case HostRoot: //3
                //根fiber
                return updateHostRoot(current, workInProgress, renderExpirationTime);
            case HostComponent: //5
                // HostComponent = 5;
                return updateHostComponent(current, workInProgress, renderExpirationTime);
            case HostText: //6
                return updateHostText(current, workInProgress);
        }
    }

    //↓↓↓↓↓↓--------workInProgress.tag为HostRoot根组件---------↓↓↓↓↓↓
    {
        function updateHostRoot(current, workInProgress, renderExpirationTime) {

            //第一次render时，没用
            var nextProps = workInProgress.pendingProps;
            var prevState = workInProgress.memoizedState;
            var prevChildren = prevState !== null ? prevState.element : null;


            //让current和workInProgress的更新负载保持一直
            cloneUpdateQueue(current, workInProgress);

            //处理更新队列，得出新的newStat
            //将fiber节点新的state赋予workInProgress的memoizedState。 workInProgress.memoizedState = newState;
            //这里的state，不是class组件中使用的state
            processUpdateQueue(workInProgress, nextProps, null, renderExpirationTime);

            var nextState = workInProgress.memoizedState;
            //element就是<APP/>的返回结果
            var nextChildren = nextState.element;

            //解析HostRoot节点的子fiber节点情况
            //根据nextChildren解析，并将解析结果赋予workInProgress.child
            reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);

            return workInProgress.child;
        }

    }
    //↑↑↑↑↑↑--------workInProgress.tag为HostRoot根组件---------↑↑↑↑↑↑


    //↓↓↓↓↓↓--------workInProgress.tag为客户端元素---------↓↓↓↓↓↓
    {
        function updateHostComponent(current, workInProgress, renderExpirationTime) {
            var type = workInProgress.type;
            var nextProps = workInProgress.pendingProps;
            var prevProps = current !== null ? current.memoizedProps : null;
            var nextChildren = nextProps.children;
            var isDirectTextChild = shouldSetTextContent(type, nextProps);
            if (isDirectTextChild) {
                // We special case a direct text child of a host node. This is a common
                // case. We won't handle it as a reified child. We will instead handle
                // this in the host environment that also has access to this prop. That
                // avoids allocating another HostText fiber and traversing it.
                nextChildren = null;
            } else if (prevProps !== null && shouldSetTextContent(type, prevProps)) {
                // If we're switching from a direct text child to a normal child, or to
                // empty, we need to schedule the text content to be reset.
                workInProgress.effectTag |= ContentReset;
            }

            if (prevProps !== null && shouldSetTextContent(type, prevProps)) {
                //作用？？？
                workInProgress.effectTag |= ContentReset;
            }

            reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
            return workInProgress.child;
        }

    }
    //↑↑↑↑↑↑--------workInProgress.tag为客户端元素---------↑↑↑↑↑↑


    //↓↓↓↓↓↓--------workInProgress.tag为class组件---------↓↓↓↓↓↓
    {
        /** 
         * 针对ClassComponent的处理
         * 构造实例，挂载实例，挂载state参数等
         * render()获取子元素
         * 更新实例等
         * 
         */
        function updateClassComponent(current, workInProgress, Component, nextProps, renderExpirationTime) {
            //省略很多代码
            //构建类实例---返回的实例没使用
            //类实体挂载在了workInProgress的statenode上面

            var instance = workInProgress.stateNode;
            var shouldUpdate;

            if (instance === null) {
                //组件第一次渲染时
                if (current !== null) {
                    current.alternate = null;
                    workInProgress.alternate = null;
                    workInProgress.effectTag |= Placement;
                }
                //1、创建一个class组件实例（instance），即业务中写好的class component。
                // 2、将实例赋值给stateNode属性：workInProgress.stateNode = instance
                //3、将classComponentUpdater挂载到instance.updater 上;（setStae,forceUpDate等都需要这个classComponentUpdater对像）
                constructClassInstance(workInProgress, Component, nextProps);

                /** 
                mountClassInstance
                 1、从updateQueue里面获取到所有的要更新的state，调用processUpdateQueue函数遍历updateQueue，遍历的过程会判断每个update的优先级，决定是否要跳过这个更新。
                 2、如果这个update需要更新，调用getStateFromUpdate获取到新的state。
                 3、更新成最新的state：instance.state = workInProgress.memoizedState;
                 4、调用React新的生命周期函数：getDerivedStateFromProps并且执行，这个生命周期可能改变State，所以再次需要instance.state = workInProgress.memoizedState
                 5、如果没有使用getDerivedStateFromProps而使用componentWillMount，这里为了兼容旧版。执行componentWillMount，这个生命周期可能改变State。
                 6、最后标记 componentDidMount 生命周期，待到提交阶段更新完 dom 后执行 
                 */
                mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
            } else if (current === null) {
                shouldUpdate = resumeMountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
            } else {
                shouldUpdate = updateClassInstance(current, workInProgress, Component, nextProps, renderExpirationTime);
            }

            var nextUnitOfWork = finishClassComponent(current, workInProgress, Component, shouldUpdate, null, renderExpirationTime);

            return nextUnitOfWork;
        }

        /**
         *  1、创建一个class组件实例（instance），即业务中写好的class component。
         *  2、将实例赋值给stateNode属性：workInProgress.stateNode = instance、
         *  3、将classComponentUpdater挂载到instance.updater 上;（setStae,forceUpDate等都需要这个classComponentUpdater对
         */
        function constructClassInstance(workInProgress, ctor, props) {
            /* var isLegacyContextConsumer = false;
            var unmaskedContext = emptyContextObject;
            var context = emptyContextObject;
        
            var contextType = ctor.contextType; */
            var instance = new ctor(props, context = null);
            var state = workInProgress.memoizedState = instance.state !== null && instance.state !== undefined ? instance.state : null;
            //将实例挂载在fiber上面
            adoptClassInstance(workInProgress, instance);

            return instance;
        }

        /** 
         *  mountClassInstance
         *  1、从updateQueue里面获取到所有的要更新的state，调用processUpdateQueue函数遍历updateQueue，遍历的过程会判断每个update的优先级，决定是否要跳过这个更新。
         *  2、如果这个update需要更新，调用getStateFromUpdate获取到新的state。
         *  3、更新成最新的state：instance.state = workInProgress.memoizedState;
         *  4、调用React新的生命周期函数：getDerivedStateFromProps并且执行，这个生命周期可能改变State，所以再次需要instance.state = workInProgress.memoizedState
         *  5、如果没有使用getDerivedStateFromProps而使用componentWillMount，这里为了兼容旧版。执行componentWillMount，这个生命周期可能改变State。
         *  6、最后标记 componentDidMount 生命周期，待到提交阶段更新完 dom 后执行 
         */
        function mountClassInstance(workInProgress, ctor, newProps, renderExpirationTime) {

            var instance = workInProgress.stateNode;
            instance.props = newProps;
            instance.state = workInProgress.memoizedState;
            //instance.refs = emptyRefsObject;

            /**
             * fiber节点初始化updateQueue属性。
             * 即fiber.updateQueue已经有一个初始化后的queue对象结构
             * queue对象会保留fiber本身的memoizedState值，存在baseState中
             */
            initializeUpdateQueue(workInProgress);

            //通过processUpdateQueue 计算新的state赋值到 fiber workInProgress.memoizedState 和 instance 上面记录
            processUpdateQueue(workInProgress, newProps, instance, renderExpirationTime);
            instance.state = workInProgress.memoizedState;
            //return
            //下面关于生命周期的暂时不关注
            var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
            //生命周期--getDerivedStateFromProps 用来替代componentWillReceiveProps
            if (typeof getDerivedStateFromProps === 'function') {
                //先注释生命周期
                applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, newProps);
                instance.state = workInProgress.memoizedState;
            } // In order to support react-lifecycles-compat polyfilled components,
            // Unsafe lifecycles should not be invoked for components using the new APIs.
            //判断是否有componentWillMount生命周期并且执行，这个生命周期也可能改变State
            if (typeof ctor.getDerivedStateFromProps !== 'function' && typeof instance.getSnapshotBeforeUpdate !== 'function' && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
                //先注释生命周期
                callComponentWillMount(workInProgress, instance); // If we had additional state updates during this life-cycle, let's
                // process them now.
                //如果改变了state，就有新的update加入updateQueue了
                processUpdateQueue(workInProgress, newProps, instance, renderExpirationTime);
                instance.state = workInProgress.memoizedState;
            }
            // 最后标记 componentDidMount 生命周期，待到提交阶段更新完 dom 后执行
            if (typeof instance.componentDidMount === 'function') {
                workInProgress.effectTag |= Update;
            }

        }


        /**
         * 在class实例挂载在fiber节点的stateNode上
         * 给实例的updater赋值位classComponentUpdater-----所以react中，指定update没意义。在react-do中会对updater重新赋值
         *
         */
        function adoptClassInstance(workInProgress, instance) {
            instance.updater = classComponentUpdater;
            workInProgress.stateNode = instance; // The instance needs access to the fiber so that it can schedule updates

            set(instance, workInProgress); //不管
        }



        /**
         * 1，实例化的class组件，调用render函数，获取子元素
         * 2，将副作用effect追加在effectTag上面
         * 3，使用render返回的元素生成fiber，并返回
         * 4，rende放回值是
         * { 
         *     $$typeof: Symbol(react.element)，
         *     key: null，
         *     props: {children: "......"}，
         *     ref: null，
         *     type: "span"
         * }，
         */

        function finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime) {
            var instance = workInProgress.stateNode;

            var nextChildren;
            nextChildren = instance.render();
            //进入考察render返回值的内部 
            //render返回reactElement结构

            workInProgress.effectTag |= PerformedWork;


            if (current !== null) {
                forceUnmountCurrentAndReconcile(current, workInProgress, nextChildren, renderExpirationTime);
            } else {
                reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
            }

            workInProgress.memoizedState = instance.state;
            return workInProgress.child;
            //注意返回的是child
        }
    }
    //↑↑↑↑↑↑--------workInProgress.tag为class组件---------↑↑↑↑↑↑


    //↓↓↓↓↓↓--------workInProgress.tag为文本---------↓↓↓↓↓↓
    {

        function updateHostText(current, workInProgress) {
            return null;
        }

        function shouldSetTextContent(type, props) {
            return type === 'textarea' || type === 'option' || type === 'noscript' || typeof props.children === 'string' || typeof props.children === 'number' || typeof props.dangerouslySetInnerHTML === 'object' && props.dangerouslySetInnerHTML !== null && props.dangerouslySetInnerHTML.__html != null;
        }
    }
    //↑↑↑↑↑↑--------workInProgress.tag为文本---------↑↑↑↑↑↑


}
//↑↑↑↑↑↑--------beginWork---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------分析用户的代码结构，完成fiber树的构建---------↓↓↓↓↓↓
{
    //执行每一个workInProgress携带的工作
    function performUnitOfWork(unitOfWork) {

        //workInProgress就是一个fiber节点，它的effectTag、nextEffect、firstEffect、lastEffect等关于前后节点的操作等一开始都为空。
        //但是workInProgress会共享它创建所依赖的current节点的状态，如tag，elementType，type，stateNode，child，updateQueue....等状态
        //workInProgress依赖current创建，所以workInProgress的过去版本就是current，
        //即：workInProgress.alternate = current;
        var current = unitOfWork.alternate;
        var next;
        //分析当前workInProgress节点,返回根据unitOfWork的子元素情况，创建的fiber
        next = beginWork(current, unitOfWork);
        unitOfWork.memoizedProps = unitOfWork.pendingProps;

        //当走到叶子节点时，开始回溯，生成dom等。
        if (next === null) {
            //当走到叶子节点时，开始回溯，生成dom等。
            next = completeUnitOfWork(unitOfWork);
        }
        return next
    }




    //workInProgress存在值，即存在工作，那么就一直执行工作performUnitOfWork(workInProgress)
    //直到workInProgress携带的工作做完
    function workLoopSync() {
        let a = 0
        while (workInProgress !== null) {
            //执行每一个workInProgress携带的工作
            workInProgress = performUnitOfWork(workInProgress);
        }
    }

}
//↑↑↑↑↑↑--------分析用户的代码结构，完成fiber树的构建---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------workInProgress的初始化---------↓↓↓↓↓↓
{
    //根据root.curren创建workInProgress
    //root.curren就是fiber树的挂载的第一个fiber元素，HostRoot

    //render的第一个workInProgress就是prepareFreshStack函数创建
    //即：通过HostRoot创建的第一个根节点
    function prepareFreshStack(root, expirationTime) {
        root.finishedWork = null;
        root.finishedExpirationTime = NoWork;
        //workInProgressRoot = root;
        //workInProgress是全局变量
        workInProgress = createWorkInProgress(root.current, null);
    }

    /**
     *根据传递的current，即一个fiber结构，创建workInProgres对象。workInProgress对象是对该fiber结构的改造和扩展
     *如果，依赖的fiber对象的alternate没有值，就创建一个fiber,并赋值
     *如果，依赖的fiber对象的alternate有值，workInProgress = current.alternate
     *workInProgress就是一个fiber节点，它的effectTag、nextEffect、firstEffect、lastEffect等关于前后节点的操作等一开始都为空。
     *但是workInProgress会共享它创建所依赖的current节点的状态，如tag，elementType，type，stateNode，child，updateQueue....等状态
     *workInProgress依赖current创建，所以workInProgress的过去版本就是current
     */

    function createWorkInProgress(current, pendingProps) {
        var workInProgress = current.alternate;
        if (workInProgress === null) {
            // We use a double buffering pooling technique because we know that we'll
            // only ever need at most two versions of a tree. We pool the "other" unused
            // node that we're free to reuse. This is lazily created to avoid allocating
            // extra objects for things that are never updated. It also allow us to
            // reclaim the extra memory if needed.
            workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode);
            workInProgress.elementType = current.elementType;
            workInProgress.type = current.type;
            workInProgress.stateNode = current.stateNode;
            workInProgress.alternate = current;
            current.alternate = workInProgress;
        } else {
            workInProgress.pendingProps = pendingProps; // We already have an alternate.
            // Reset the effect tag.
            workInProgress.effectTag = NoEffect; // The effect list is no longer valid.
            workInProgress.nextEffect = null;
            workInProgress.firstEffect = null;
            workInProgress.lastEffect = null;
        }

        workInProgress.childExpirationTime = current.childExpirationTime;
        workInProgress.expirationTime = current.expirationTime;
        workInProgress.child = current.child;
        workInProgress.memoizedProps = current.memoizedProps;
        workInProgress.memoizedState = current.memoizedState;
        workInProgress.updateQueue = current.updateQueue; // Clone the dependencies object. 
        //This is mutated during the render phase, so
        // it cannot be shared with the current fiber.
        // var currentDependencies = current.dependencies;

        workInProgress.sibling = current.sibling;
        workInProgress.index = current.index;
        workInProgress.ref = current.ref;

        return workInProgress;
    }
}
//↑↑↑↑↑↑--------workInProgress的初始化---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------render主流程---------↓↓↓↓↓↓
{
    /**
     * 
     * 从fiber根节点开始，同步渲染
     * 1，prepareFreshStack声明workInProgress即第一个工作单元的初始值
     * 2，workLoopSync 分析代码的fiber结构，完成fiber树的构建
     * 3，finishSyncRender 将fiber树渲染到容器中
     * 
     * diiff在哪里？
     * 第一次render,不需要diff
     * 
     */
    function performSyncWorkOnRoot(root) {
        //root指的是fiberRoot，fiber数据结构的根节点


        var expirationTime = Sync;

        //给全局的workInProgress变量赋值
        //第一次的workInProgress的值，就是根据fiberRoot.current创建的，就是HostRoot,下一个根据<APP/>
        //
        prepareFreshStack(root, expirationTime);

        //完成workInProgress携带的工作 ，即完成fiber分析
        workLoopSync()

        console.log(document.getElementById('root')._reactRootContainer)
        //commitfiber
        root.finishedWork = root.current.alternate;
        root.finishedExpirationTime = expirationTime;


        finishSyncRender(root);

        return null;

    }

    //安排工作
    //expirationTime === Sync执行同步渲染。浏览器端就是这里
    function scheduleWork(fiber, expirationTime) {
        let root = fiber.stateNode;
        //这里的fiber参数，传递的是fiberRoot.current
        //而fiberRoot.current.stateNode仍然指向fiberRoot----- legacyCreateRootFromDOMContainer函数里面指定的，uninitializedFiber.stateNode = root;
        //所以这里的root就是fiberRoot

        //搞得好绕，总之：root指的是fiberRoot，fiber数据结构的根节点
        if (expirationTime === Sync) {
            // 在根目录上执行同步工作
            performSyncWorkOnRoot(root);
        } else {
            // 
        }

    }

    function updateContainer(element, fiberRoot) {
        /*  总结：
          （1）获取节点对应的fiber对象
          （2）计算currentTime---本版本暂时不管时间
          （3）根据（1）fiber和（2）currentTime计算fiber对象的expirationTime---本版本暂时不管时间
          （4）根据（3）expirationTime创建update对象---本版本暂时不管时间
          （5）ReactDOM.render要的渲染元素element赋值给update.payload
          //（5）将setState中要更新的对象赋值到（4）update.payload，
          （6）将callback赋值到（4）update.callback-------未使用，不管
          （7）update入队updateQueue
          （8）进行任务调度 ---本版本暂时不管调度，顺序执行。
        */


        //fiber树载中的坑位
        var current = fiberRoot.current;

        /* currentTime 时间为 ：
           调度器 Scheduler 的 系统当前时间 now/10，抹去10ms 的误差。
           以上结果 |0，取整。
           最大偏移量 MAGIC_NUMBER_OFFSET- 以上结果 
           即：1073741821 - (now/10|0)。*/

        //本版本暂时不管这个时间，我随便赋值。
        var currentTime = requestCurrentTimeForUpdate();


        /* 
          同步
          expirationTime = Sync
          交互事件，优先级较高
          expirationTime = computeInteractiveExpiration(currentTime)
          异步，优先级较低
          expirationTime = computeAsyncExpiration(currentTime)
         */

        //本版本暂时不管这个时间，我随便赋值为Sync。
        var expirationTime = computeExpirationForFiber(currentTime, current);
        //因为 expirationTime 指的就是一个任务的过期时间，React 根据任务的优先级和当前时间来计算出一个任务的执行截止时间。
        //只要这个值比当前时间大就可以一直让 React 延后这个任务的执行，以便让更高优先级的任务执行,
        //但是一旦过了任务的截止时间，就必须让这个任务马上执行。
        //任务的过期时间是通过当前时间加上一个常量（任务优先级不同常量不同）计算出来的
        var update = createUpdate(expirationTime);


        //update更新对象的更新材料是element,就是 <APP/>经过jsx和react解析后的结构。React.createElement()的结果
        update.payload = {
            element: element
        };

        //2、将刚创建的update对象入队到fiber.updateQueue队列中
        //排队更新，新的更新任务插队fiber.updateQueue的最前面
        enqueueUpdate(current, update);

        //3、开始进入React渲染的核心：React Scheduler
        //安排工作----重要
        scheduleWork(current, expirationTime);
        return expirationTime;

    }

    //在dom容器中，创建fiber数据结构的根结点。
    function legacyCreateRootFromDOMContainer(container) {
        var rootSibling;

        //清楚容器内部的节点
        //我们在创建ReactDOM.render入口的时候，说DOM组件内应该为空。即使不为空也会被清空
        while (rootSibling = container.lastChild) {
            container.removeChild(rootSibling);
        }

        //创建fiber树的栽种地节点
        var root = new FiberRootNode(container)

        //创建fiber树的第一个节点，HostRoot = 3
        var uninitializedFiber = createFiber(HostRoot = 3, null, null);


        ///fiber根节点的current属性，指向fiber节点，这个fiber节点将会是会面的我们代码定义的fiber节点.
        //fiber根节点的第一个fiber子节点的stateNode属性，指向fiber的根节点
        uninitializedFiber.stateNode = root;
        //root.current = uninitializedFiber;
        root.current = uninitializedFiber;

        //初始化fiber节点的updateQueue属性。更新包的初始化挂载
        //即fiber.updateQueue已经有一个对象结构
        initializeUpdateQueue(uninitializedFiber);
        return {
            _internalRoot: root
        }

    }

    //入口函数，从这里开始执行raect-dom的逻辑
    ReactDOM.render = function (element, container, callback) {
        var root = container._reactRootContainer;
        var fiberRoot;
        if (!root) {
            //创建fiber树，包含fiber根节点和一个fiber节点
            root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container)
            //root._reactRootContainer._internalRoot指向fiber结构的根节点，即下面的fiberRoot。
            //根节点里面包含很多信息，如container这个DOM元素信息。

            //fiberRoot.current指向第一个fiber节点。
            //这第一个fiber节点的stateNode指向fiberRoot根节点。
            //这里互相指引，很绕。记住fiberRoot.current就是根节点挂载的fiber树。
            fiberRoot = root._internalRoot;


            //根据传递的element和刚创建的初始fiber数据机构，渲染或更新container容器内容
            updateContainer(element, fiberRoot);
        }
    }
}
//↑↑↑↑↑↑--------render主流程---------↑↑↑↑↑↑


{
    //     var classComponentUpdater = {
    //     isMounted: isMounted,
    //     enqueueSetState: function (inst, payload, callback) {
    //         //
    //         console.log(++xxx_panfeng, "操作了多少次setstate")
    //         var fiber = get(inst);
    //         var currentTime = requestCurrentTimeForUpdate();
    //         var suspenseConfig = requestCurrentSuspenseConfig();
    //         var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
    //         var update = createUpdate(expirationTime, suspenseConfig);
    //         update.payload = payload;

    //         if (callback !== undefined && callback !== null) {
    //             {
    //                 warnOnInvalidCallback(callback, 'setState');
    //             }

    //             update.callback = callback;
    //         }

    //         enqueueUpdate(fiber, update);
    //         scheduleWork(fiber, expirationTime);

    //         //上面和ReactDOM.render中scheduleRootUpdate非常的相似。其实他们就是同一个更新原理呢
    //         /*  （1）获取节点对应的fiber对象
    //            （2）计算currentTime
    //            （3）根据（1）fiber和（2）currentTime计算fiber对象的expirationTime
    //            （4）根据（3）expirationTime创建update对象
    //            （5）将setState中要更新的对象赋值到（4）update.payload，ReactDOM.render是{element}
    //            （6）将callback赋值到（4）update.callback
    //            （7）update入队updateQueue
    //            （8）进行任务调度 
    //          */
    //     },
    //     enqueueReplaceState: function (inst, payload, callback) {
    //         var fiber = get(inst);
    //         var currentTime = requestCurrentTimeForUpdate();
    //         var suspenseConfig = requestCurrentSuspenseConfig();
    //         var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
    //         var update = createUpdate(expirationTime, suspenseConfig);
    //         update.tag = ReplaceState;
    //         update.payload = payload;

    //         if (callback !== undefined && callback !== null) {
    //             {
    //                 warnOnInvalidCallback(callback, 'replaceState');
    //             }

    //             update.callback = callback;
    //         }

    //         enqueueUpdate(fiber, update);
    //         scheduleWork(fiber, expirationTime);
    //     },
    //     enqueueForceUpdate: function (inst, callback) {
    //         var fiber = get(inst);
    //         var currentTime = requestCurrentTimeForUpdate();
    //         var suspenseConfig = requestCurrentSuspenseConfig();
    //         var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
    //         var update = createUpdate(expirationTime, suspenseConfig);
    //         update.tag = ForceUpdate;

    //         if (callback !== undefined && callback !== null) {
    //             {
    //                 warnOnInvalidCallback(callback, 'forceUpdate');
    //             }

    //             update.callback = callback;
    //         }

    //         enqueueUpdate(fiber, update);
    //         scheduleWork(fiber, expirationTime);

    //         /*  （1）获取节点对应的fiber对象
    //             （2）计算currentTime
    //             （3）根据（1）fiber和（2）currentTime计算fiber对象的expirationTime
    //             （4）根据（3）expirationTime创建update对象
    //             （5）将setState中要更新的对象赋值到（4）update.payload，ReactDOM.render是{element}
    //             （6）将callback赋值到（4）update.callback
    //             （7）update入队updateQueue
    //             （8）进行任务调度 
    //           */
    //     }
    // };
}



function updateClassInstance(current, workInProgress, ctor, newProps, renderExpirationTime) {
    var instance = workInProgress.stateNode;
    cloneUpdateQueue(current, workInProgress);
    var oldProps = workInProgress.memoizedProps;
    instance.props = workInProgress.type === workInProgress.elementType ? oldProps : resolveDefaultProps(workInProgress.type, oldProps);
    var oldContext = instance.context;
    var contextType = ctor.contextType;
    var nextContext = emptyContextObject;

    if (typeof contextType === 'object' && contextType !== null) {
        nextContext = readContext(contextType);
    } else {
        var nextUnmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
        nextContext = getMaskedContext(workInProgress, nextUnmaskedContext);
    }

    var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
    var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function'; // Note: During these life-cycles, instance.props/instance.state are what
    // ever the previously attempted to render - not the "current". However,
    // during componentDidUpdate we pass the "current" props.
    // In order to support react-lifecycles-compat polyfilled components,
    // Unsafe lifecycles should not be invoked for components using the new APIs.

    if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === 'function' || typeof instance.componentWillReceiveProps === 'function')) {
        if (oldProps !== newProps || oldContext !== nextContext) {
            callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext);
        }
    }

    resetHasForceUpdateBeforeProcessing();
    var oldState = workInProgress.memoizedState;
    var newState = instance.state = oldState;
    processUpdateQueue(workInProgress, newProps, instance, renderExpirationTime);
    newState = workInProgress.memoizedState;

    if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
        // If an update was already in progress, we should schedule an Update
        // effect even though we're bailing out, so that cWU/cDU are called.
        if (typeof instance.componentDidUpdate === 'function') {
            if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
                workInProgress.effectTag |= Update;
            }
        }

        if (typeof instance.getSnapshotBeforeUpdate === 'function') {
            if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
                workInProgress.effectTag |= Snapshot;
            }
        }

        return false;
    }

    if (typeof getDerivedStateFromProps === 'function') {
        applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, newProps);
        newState = workInProgress.memoizedState;
    }

    var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext);

    if (shouldUpdate) {
        // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for components using the new APIs.
        if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillUpdate === 'function' || typeof instance.componentWillUpdate === 'function')) {
            startPhaseTimer(workInProgress, 'componentWillUpdate');

            if (typeof instance.componentWillUpdate === 'function') {
                instance.componentWillUpdate(newProps, newState, nextContext);
            }

            if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
                instance.UNSAFE_componentWillUpdate(newProps, newState, nextContext);
            }

            stopPhaseTimer();
        }

        if (typeof instance.componentDidUpdate === 'function') {
            workInProgress.effectTag |= Update;
        }

        if (typeof instance.getSnapshotBeforeUpdate === 'function') {
            workInProgress.effectTag |= Snapshot;
        }
    } else {
        // If an update was already in progress, we should schedule an Update
        // effect even though we're bailing out, so that cWU/cDU are called.
        if (typeof instance.componentDidUpdate === 'function') {
            if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
                workInProgress.effectTag |= Update;
            }
        }

        if (typeof instance.getSnapshotBeforeUpdate === 'function') {
            if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
                workInProgress.effectTag |= Snapshot;
            }
        } // If shouldComponentUpdate returned false, we should still update the
        // memoized props/state to indicate that this work can be reused.


        workInProgress.memoizedProps = newProps;
        workInProgress.memoizedState = newState;
    } // Update the existing instance's state, props, and context pointers even
    // if shouldComponentUpdate returns false.


    instance.props = newProps;
    instance.state = newState;
    instance.context = nextContext;
    return shouldUpdate;
}



function noop() {}

function trapClickOnNonInteractiveElement(node) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
    // Just set it using the onclick property so that we don't have to manage any
    // bookkeeping for it. Not sure if we need to clear it when the listener is
    // removed.
    // TODO: Only do this for the relevant Safaris maybe?
    node.onclick = noop;
}



//------------------------event
//------------------------event
//------------------------event
//------------------------event
//------------------------event
//------------------------event
//------------------------event
//------------------------event
//------------------------event
//------------------------event


function ensureListeningTo(rootContainerElement, registrationName) {
    var isDocumentOrFragment = rootContainerElement.nodeType === DOCUMENT_NODE || rootContainerElement.nodeType === DOCUMENT_FRAGMENT_NODE;
    var doc = isDocumentOrFragment ? rootContainerElement : rootContainerElement.ownerDocument;
    legacyListenToEvent(registrationName, doc);
}

var registrationNameDependencies = {};

function legacyListenToEvent(registrationName, mountAt) {
    var listenerMap = getListenerMapForElement(mountAt);
    debugger
    var dependencies = registrationNameDependencies[registrationName];

    for (var i = 0; i < dependencies.length; i++) {
        var dependency = dependencies[i];
        legacyListenToTopLevelEvent(dependency, mountAt, listenerMap);
    }
}



function legacyListenToTopLevelEvent(topLevelType, mountAt, listenerMap) {
    if (!listenerMap.has(topLevelType)) {
        switch (topLevelType) {
            case TOP_SCROLL:
                trapCapturedEvent(TOP_SCROLL, mountAt);
                break;

            case TOP_FOCUS:
            case TOP_BLUR:
                trapCapturedEvent(TOP_FOCUS, mountAt);
                trapCapturedEvent(TOP_BLUR, mountAt); // We set the flag for a single dependency later in this function,
                // but this ensures we mark both as attached rather than just one.

                listenerMap.set(TOP_BLUR, null);
                listenerMap.set(TOP_FOCUS, null);
                break;

            case TOP_CANCEL:
            case TOP_CLOSE:
                if (isEventSupported(getRawEventName(topLevelType))) {
                    trapCapturedEvent(topLevelType, mountAt);
                }

                break;

            case TOP_INVALID:
            case TOP_SUBMIT:
            case TOP_RESET:
                // We listen to them on the target DOM elements.
                // Some of them bubble so we don't want them to fire twice.
                break;

            default:
                // By default, listen on the top level to all non-media events.
                // Media events don't bubble so adding the listener wouldn't do anything.
                var isMediaEvent = mediaEventTypes.indexOf(topLevelType) !== -1;

                if (!isMediaEvent) {
                    trapBubbledEvent(topLevelType, mountAt);
                }

                break;
        }

        listenerMap.set(topLevelType, null);
    }
}


function trapCapturedEvent(topLevelType, element) {
    trapEventForPluginEventSystem(element, topLevelType, true);
}




var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map; // prettier-ignore

var elementListenerMap = new PossiblyWeakMap();

function getListenerMapForElement(element) {
    var listenerMap = elementListenerMap.get(element);

    if (listenerMap === undefined) {
        listenerMap = new Map();
        elementListenerMap.set(element, listenerMap);
    }

    return listenerMap;
}








var discreteEventPairsForSimpleEventPlugin = [TOP_BLUR, 'blur', TOP_CANCEL, 'cancel', TOP_CLICK, 'click', TOP_CLOSE, 'close', TOP_CONTEXT_MENU, 'contextMenu', TOP_COPY, 'copy', TOP_CUT, 'cut', TOP_AUX_CLICK, 'auxClick', TOP_DOUBLE_CLICK, 'doubleClick', TOP_DRAG_END, 'dragEnd', TOP_DRAG_START, 'dragStart', TOP_DROP, 'drop', TOP_FOCUS, 'focus', TOP_INPUT, 'input', TOP_INVALID, 'invalid', TOP_KEY_DOWN, 'keyDown', TOP_KEY_PRESS, 'keyPress', TOP_KEY_UP, 'keyUp', TOP_MOUSE_DOWN, 'mouseDown', TOP_MOUSE_UP, 'mouseUp', TOP_PASTE, 'paste', TOP_PAUSE, 'pause', TOP_PLAY, 'play', TOP_POINTER_CANCEL, 'pointerCancel', TOP_POINTER_DOWN, 'pointerDown', TOP_POINTER_UP, 'pointerUp', TOP_RATE_CHANGE, 'rateChange', TOP_RESET, 'reset', TOP_SEEKED, 'seeked', TOP_SUBMIT, 'submit', TOP_TOUCH_CANCEL, 'touchCancel', TOP_TOUCH_END, 'touchEnd', TOP_TOUCH_START, 'touchStart', TOP_VOLUME_CHANGE, 'volumeChange'];
var otherDiscreteEvents = [TOP_CHANGE, TOP_SELECTION_CHANGE, TOP_TEXT_INPUT, TOP_COMPOSITION_START, TOP_COMPOSITION_END, TOP_COMPOSITION_UPDATE]; // prettier-ignore

var userBlockingPairsForSimpleEventPlugin = [TOP_DRAG, 'drag', TOP_DRAG_ENTER, 'dragEnter', TOP_DRAG_EXIT, 'dragExit', TOP_DRAG_LEAVE, 'dragLeave', TOP_DRAG_OVER, 'dragOver', TOP_MOUSE_MOVE, 'mouseMove', TOP_MOUSE_OUT, 'mouseOut', TOP_MOUSE_OVER, 'mouseOver', TOP_POINTER_MOVE, 'pointerMove', TOP_POINTER_OUT, 'pointerOut', TOP_POINTER_OVER, 'pointerOver', TOP_SCROLL, 'scroll', TOP_TOGGLE, 'toggle', TOP_TOUCH_MOVE, 'touchMove', TOP_WHEEL, 'wheel']; // prettier-ignore

var continuousPairsForSimpleEventPlugin = [TOP_ABORT, 'abort', TOP_ANIMATION_END, 'animationEnd', TOP_ANIMATION_ITERATION, 'animationIteration', TOP_ANIMATION_START, 'animationStart', TOP_CAN_PLAY, 'canPlay', TOP_CAN_PLAY_THROUGH, 'canPlayThrough', TOP_DURATION_CHANGE, 'durationChange', TOP_EMPTIED, 'emptied', TOP_ENCRYPTED, 'encrypted', TOP_ENDED, 'ended', TOP_ERROR, 'error', TOP_GOT_POINTER_CAPTURE, 'gotPointerCapture', TOP_LOAD, 'load', TOP_LOADED_DATA, 'loadedData', TOP_LOADED_METADATA, 'loadedMetadata', TOP_LOAD_START, 'loadStart', TOP_LOST_POINTER_CAPTURE, 'lostPointerCapture', TOP_PLAYING, 'playing', TOP_PROGRESS, 'progress', TOP_SEEKING, 'seeking', TOP_STALLED, 'stalled', TOP_SUSPEND, 'suspend', TOP_TIME_UPDATE, 'timeUpdate', TOP_TRANSITION_END, 'transitionEnd', TOP_WAITING, 'waiting'];


var simpleEventPluginEventTypes = {};

function processSimpleEventPluginPairsByPriority(eventTypes, priority) {
    // As the event types are in pairs of two, we need to iterate
    // through in twos. The events are in pairs of two to save code
    // and improve init perf of processing this array, as it will
    // result in far fewer object allocations and property accesses
    // if we only use three arrays to process all the categories of
    // instead of tuples.
    for (var i = 0; i < eventTypes.length; i += 2) {
        var topEvent = eventTypes[i];
        var event = eventTypes[i + 1];
        var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
        var onEvent = 'on' + capitalizedEvent;
        var config = {
            phasedRegistrationNames: {
                bubbled: onEvent,
                captured: onEvent + 'Capture'
            },
            dependencies: [topEvent],
            eventPriority: priority
        };
        eventPriorities.set(topEvent, priority);
        topLevelEventsToDispatchConfig.set(topEvent, config);
        simpleEventPluginEventTypes[event] = config;
    }
}




processSimpleEventPluginPairsByPriority(discreteEventPairsForSimpleEventPlugin, DiscreteEvent);
processSimpleEventPluginPairsByPriority(userBlockingPairsForSimpleEventPlugin, UserBlockingEvent);
processSimpleEventPluginPairsByPriority(continuousPairsForSimpleEventPlugin, ContinuousEvent); // 

var namesToPlugins = {};

var DOMEventPluginOrder = ['ResponderEventPlugin', 'SimpleEventPlugin', 'EnterLeaveEventPlugin', 'ChangeEventPlugin', 'SelectEventPlugin', 'BeforeInputEventPlugin'];
/**
 * Inject modules for resolving DOM hierarchy and plugin ordering.
 */

injectEventPluginOrder(DOMEventPluginOrder);

var SimpleEventPlugin = {
    // simpleEventPluginEventTypes gets populated from
    // the DOMEventProperties module.
    eventTypes: simpleEventPluginEventTypes,
    extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
        var dispatchConfig = topLevelEventsToDispatchConfig.get(topLevelType);

        if (!dispatchConfig) {
            return null;
        }

        var EventConstructor;

        switch (topLevelType) {
            case TOP_KEY_PRESS:
                // Firefox creates a keypress event for function keys too. This removes
                // the unwanted keypress events. Enter is however both printable and
                // non-printable. One would expect Tab to be as well (but it isn't).
                if (getEventCharCode(nativeEvent) === 0) {
                    return null;
                }

                /* falls through */

                case TOP_KEY_DOWN:
                case TOP_KEY_UP:
                    EventConstructor = SyntheticKeyboardEvent;
                    break;

                case TOP_BLUR:
                case TOP_FOCUS:
                    EventConstructor = SyntheticFocusEvent;
                    break;

                case TOP_CLICK:
                    // Firefox creates a click event on right mouse clicks. This removes the
                    // unwanted click events.
                    if (nativeEvent.button === 2) {
                        return null;
                    }

                    /* falls through */

                    case TOP_AUX_CLICK:
                    case TOP_DOUBLE_CLICK:
                    case TOP_MOUSE_DOWN:
                    case TOP_MOUSE_MOVE:
                    case TOP_MOUSE_UP: // TODO: Disabled elements should not respond to mouse events

                        /* falls through */

                    case TOP_MOUSE_OUT:
                    case TOP_MOUSE_OVER:
                    case TOP_CONTEXT_MENU:
                        EventConstructor = SyntheticMouseEvent;
                        break;

                    case TOP_DRAG:
                    case TOP_DRAG_END:
                    case TOP_DRAG_ENTER:
                    case TOP_DRAG_EXIT:
                    case TOP_DRAG_LEAVE:
                    case TOP_DRAG_OVER:
                    case TOP_DRAG_START:
                    case TOP_DROP:
                        EventConstructor = SyntheticDragEvent;
                        break;

                    case TOP_TOUCH_CANCEL:
                    case TOP_TOUCH_END:
                    case TOP_TOUCH_MOVE:
                    case TOP_TOUCH_START:
                        EventConstructor = SyntheticTouchEvent;
                        break;

                    case TOP_ANIMATION_END:
                    case TOP_ANIMATION_ITERATION:
                    case TOP_ANIMATION_START:
                        EventConstructor = SyntheticAnimationEvent;
                        break;

                    case TOP_TRANSITION_END:
                        EventConstructor = SyntheticTransitionEvent;
                        break;

                    case TOP_SCROLL:
                        EventConstructor = SyntheticUIEvent;
                        break;

                    case TOP_WHEEL:
                        EventConstructor = SyntheticWheelEvent;
                        break;

                    case TOP_COPY:
                    case TOP_CUT:
                    case TOP_PASTE:
                        EventConstructor = SyntheticClipboardEvent;
                        break;

                    case TOP_GOT_POINTER_CAPTURE:
                    case TOP_LOST_POINTER_CAPTURE:
                    case TOP_POINTER_CANCEL:
                    case TOP_POINTER_DOWN:
                    case TOP_POINTER_MOVE:
                    case TOP_POINTER_OUT:
                    case TOP_POINTER_OVER:
                    case TOP_POINTER_UP:
                        EventConstructor = SyntheticPointerEvent;
                        break;

                    default: {
                        if (knownHTMLTopLevelTypes.indexOf(topLevelType) === -1) {
                            error('SimpleEventPlugin: Unhandled event type, `%s`. This warning ' + 'is likely caused by a bug in React. Please file an issue.', topLevelType);
                        }
                    } // HTML Events
                    // @see http://www.w3.org/TR/html5/index.html#events-0


                    EventConstructor = SyntheticEvent;
                    break;
        }

        var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
        accumulateTwoPhaseDispatches(event);
        return event;
    }
};

var EnterLeaveEventPlugin = {
    eventTypes: eventTypes$2,

    /**
     * For almost every interaction we care about, there will be both a top-level
     * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
     * we do not extract duplicate events. However, moving the mouse into the
     * browser from outside will not fire a `mouseout` event. In this case, we use
     * the `mouseover` top-level event.
     */
    extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
        var isOverEvent = topLevelType === TOP_MOUSE_OVER || topLevelType === TOP_POINTER_OVER;
        var isOutEvent = topLevelType === TOP_MOUSE_OUT || topLevelType === TOP_POINTER_OUT;

        if (isOverEvent && (eventSystemFlags & IS_REPLAYED) === 0 && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
            // If this is an over event with a target, then we've already dispatched
            // the event in the out event of the other target. If this is replayed,
            // then it's because we couldn't dispatch against this target previously
            // so we have to do it now instead.
            return null;
        }

        if (!isOutEvent && !isOverEvent) {
            // Must not be a mouse or pointer in or out - ignoring.
            return null;
        }

        var win;

        if (nativeEventTarget.window === nativeEventTarget) {
            // `nativeEventTarget` is probably a window object.
            win = nativeEventTarget;
        } else {
            // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
            var doc = nativeEventTarget.ownerDocument;

            if (doc) {
                win = doc.defaultView || doc.parentWindow;
            } else {
                win = window;
            }
        }

        var from;
        var to;

        if (isOutEvent) {
            from = targetInst;
            var related = nativeEvent.relatedTarget || nativeEvent.toElement;
            to = related ? getClosestInstanceFromNode(related) : null;

            if (to !== null) {
                var nearestMounted = getNearestMountedFiber(to);

                if (to !== nearestMounted || to.tag !== HostComponent && to.tag !== HostText) {
                    to = null;
                }
            }
        } else {
            // Moving to a node from outside the window.
            from = null;
            to = targetInst;
        }

        if (from === to) {
            // Nothing pertains to our managed components.
            return null;
        }

        var eventInterface, leaveEventType, enterEventType, eventTypePrefix;

        if (topLevelType === TOP_MOUSE_OUT || topLevelType === TOP_MOUSE_OVER) {
            eventInterface = SyntheticMouseEvent;
            leaveEventType = eventTypes$2.mouseLeave;
            enterEventType = eventTypes$2.mouseEnter;
            eventTypePrefix = 'mouse';
        } else if (topLevelType === TOP_POINTER_OUT || topLevelType === TOP_POINTER_OVER) {
            eventInterface = SyntheticPointerEvent;
            leaveEventType = eventTypes$2.pointerLeave;
            enterEventType = eventTypes$2.pointerEnter;
            eventTypePrefix = 'pointer';
        }

        var fromNode = from == null ? win : getNodeFromInstance$1(from);
        var toNode = to == null ? win : getNodeFromInstance$1(to);
        var leave = eventInterface.getPooled(leaveEventType, from, nativeEvent, nativeEventTarget);
        leave.type = eventTypePrefix + 'leave';
        leave.target = fromNode;
        leave.relatedTarget = toNode;
        var enter = eventInterface.getPooled(enterEventType, to, nativeEvent, nativeEventTarget);
        enter.type = eventTypePrefix + 'enter';
        enter.target = toNode;
        enter.relatedTarget = fromNode;
        accumulateEnterLeaveDispatches(leave, enter, from, to); // If we are not processing the first ancestor, then we
        // should not process the same nativeEvent again, as we
        // will have already processed it in the first ancestor.

        if ((eventSystemFlags & IS_FIRST_ANCESTOR) === 0) {
            return [leave];
        }

        return [leave, enter];
    }
};

var ChangeEventPlugin = {
    eventTypes: eventTypes$1,
    _isInputEventSupported: isInputEventSupported,
    extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
        var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;
        var getTargetInstFunc, handleEventFunc;

        if (shouldUseChangeEvent(targetNode)) {
            getTargetInstFunc = getTargetInstForChangeEvent;
        } else if (isTextInputElement(targetNode)) {
            if (isInputEventSupported) {
                getTargetInstFunc = getTargetInstForInputOrChangeEvent;
            } else {
                getTargetInstFunc = getTargetInstForInputEventPolyfill;
                handleEventFunc = handleEventsForInputEventPolyfill;
            }
        } else if (shouldUseClickEvent(targetNode)) {
            getTargetInstFunc = getTargetInstForClickEvent;
        }

        if (getTargetInstFunc) {
            var inst = getTargetInstFunc(topLevelType, targetInst);

            if (inst) {
                var event = createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
                return event;
            }
        }

        if (handleEventFunc) {
            handleEventFunc(topLevelType, targetNode, targetInst);
        } // When blurring, set the value attribute for number inputs


        if (topLevelType === TOP_BLUR) {
            handleControlledInputBlur(targetNode);
        }
    }
};

var SelectEventPlugin = {
    eventTypes: eventTypes$3,
    extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags, container) {
        var containerOrDoc = container || getEventTargetDocument(nativeEventTarget); // Track whether all listeners exists for this plugin. If none exist, we do
        // not extract events. See #3639.

        if (!containerOrDoc || !isListeningToAllDependencies('onSelect', containerOrDoc)) {
            return null;
        }

        var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;

        switch (topLevelType) {
            // Track the input node that has focus.
            case TOP_FOCUS:
                if (isTextInputElement(targetNode) || targetNode.contentEditable === 'true') {
                    activeElement$1 = targetNode;
                    activeElementInst$1 = targetInst;
                    lastSelection = null;
                }

                break;

            case TOP_BLUR:
                activeElement$1 = null;
                activeElementInst$1 = null;
                lastSelection = null;
                break;
                // Don't fire the event while the user is dragging. This matches the
                // semantics of the native select event.

            case TOP_MOUSE_DOWN:
                mouseDown = true;
                break;

            case TOP_CONTEXT_MENU:
            case TOP_MOUSE_UP:
            case TOP_DRAG_END:
                mouseDown = false;
                return constructSelectEvent(nativeEvent, nativeEventTarget);
                // Chrome and IE fire non-standard event when selection is changed (and
                // sometimes when it hasn't). IE's event fires out of order with respect
                // to key and input events on deletion, so we discard it.
                //
                // Firefox doesn't support selectionchange, so check selection status
                // after each key entry. The selection changes after keydown and before
                // keyup, but we check on keydown as well in the case of holding down a
                // key, when multiple keydown events are fired but only one keyup is.
                // This is also our approach for IE handling, for the reason above.

            case TOP_SELECTION_CHANGE:
                if (skipSelectionChangeEvent) {
                    break;
                }

                // falls through

                case TOP_KEY_DOWN:
                case TOP_KEY_UP:
                    return constructSelectEvent(nativeEvent, nativeEventTarget);
        }

        return null;
    }
};

var BeforeInputEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
        var composition = extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget);
        var beforeInput = extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget);

        if (composition === null) {
            return beforeInput;
        }

        if (beforeInput === null) {
            return composition;
        }

        return [composition, beforeInput];
    }
};


injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin,
    EnterLeaveEventPlugin: EnterLeaveEventPlugin,
    ChangeEventPlugin: ChangeEventPlugin,
    SelectEventPlugin: SelectEventPlugin,
    BeforeInputEventPlugin: BeforeInputEventPlugin
});

function injectEventPluginOrder(injectedEventPluginOrder) {
    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
    recomputePluginOrdering();
}


function injectEventPluginsByName(injectedNamesToPlugins) {
    var isOrderingDirty = false;

    for (var pluginName in injectedNamesToPlugins) {
        if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
            continue;
        }

        var pluginModule = injectedNamesToPlugins[pluginName];

        if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
            if (!!namesToPlugins[pluginName]) {
                {
                    throw Error("EventPluginRegistry: Cannot inject two different event plugins using the same name, `" + pluginName + "`.");
                }
            }

            namesToPlugins[pluginName] = pluginModule;
            isOrderingDirty = true;
        }
    }

    if (isOrderingDirty) {
        recomputePluginOrdering();
    }
}




function recomputePluginOrdering() {
    if (!eventPluginOrder) {
        // Wait until an `eventPluginOrder` is injected.
        return;
    }

    for (var pluginName in namesToPlugins) {
        var pluginModule = namesToPlugins[pluginName];
        var pluginIndex = eventPluginOrder.indexOf(pluginName);


        if (plugins[pluginIndex]) {
            continue;
        }


        plugins[pluginIndex] = pluginModule;
        var publishedEvents = pluginModule.eventTypes;

        for (var eventName in publishedEvents) {
            if (!publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName)) {
                {
                    throw Error("EventPluginRegistry: Failed to publish event `" + eventName + "` for plugin `" + pluginName + "`.");
                }
            }
        }
    }
}


var eventNameDispatchConfigs = {}

function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {


    eventNameDispatchConfigs[eventName] = dispatchConfig;
    var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;

    if (phasedRegistrationNames) {
        for (var phaseName in phasedRegistrationNames) {
            if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
                var phasedRegistrationName = phasedRegistrationNames[phaseName];
                publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
            }
        }
        return true;
    } else if (dispatchConfig.registrationName) {
        publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
        return true;
    }

    return false;
}

function publishRegistrationName(registrationName, pluginModule, eventName) {

    registrationNameModules[registrationName] = pluginModule;
    registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;

    {
        var lowerCasedName = registrationName.toLowerCase();
        possibleRegistrationNames[lowerCasedName] = registrationName;

        if (registrationName === 'onDoubleClick') {
            possibleRegistrationNames.ondblclick = registrationName;
        }
    }
}






//-------------------?


var discreteReplayableEvents = [TOP_MOUSE_DOWN, TOP_MOUSE_UP, TOP_TOUCH_CANCEL, TOP_TOUCH_END, TOP_TOUCH_START, TOP_AUX_CLICK, TOP_DOUBLE_CLICK, TOP_POINTER_CANCEL, TOP_POINTER_DOWN, TOP_POINTER_UP, TOP_DRAG_END, TOP_DRAG_START, TOP_DROP, TOP_COMPOSITION_END, TOP_COMPOSITION_START, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_INPUT, TOP_TEXT_INPUT, TOP_CLOSE, TOP_CANCEL, TOP_COPY, TOP_CUT, TOP_PASTE, TOP_CLICK, TOP_CHANGE, TOP_CONTEXT_MENU, TOP_RESET, TOP_SUBMIT];
var continuousReplayableEvents = [TOP_FOCUS, TOP_BLUR, TOP_DRAG_ENTER, TOP_DRAG_LEAVE, TOP_MOUSE_OVER, TOP_MOUSE_OUT, TOP_POINTER_OVER, TOP_POINTER_OUT, TOP_GOT_POINTER_CAPTURE, TOP_LOST_POINTER_CAPTURE];



function dispatchEvent(topLevelType, eventSystemFlags, container, nativeEvent) {
    if (!_enabled) {
        return;
    }

    if (hasQueuedDiscreteEvents() &&
        (topLevelType)) {
        // If we already have a queue of discrete events, and this is another discrete
        // event, then we can't dispatch it regardless of its target, since they
        // need to dispatch in order.
        queueDiscreteEvent(null, // Flags that we're not actually blocked on anything as far as we know.
            topLevelType, eventSystemFlags, container, nativeEvent);
        return;
    }

    var blockedOn = attemptToDispatchEvent(topLevelType, eventSystemFlags, container, nativeEvent);

    if (blockedOn === null) {
        // We successfully dispatched this event.
        clearIfContinuousEvent(topLevelType, nativeEvent);
        return;
    }

    if (isReplayableDiscreteEvent(topLevelType)) {
        // This this to be replayed later once the target is available.
        queueDiscreteEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent);
        return;
    }

    if (queueIfContinuousEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent)) {
        return;
    } // We need to clear only if we didn't queue because
    // queueing is accummulative.


    clearIfContinuousEvent(topLevelType, nativeEvent); // This is not replayable so we'll invoke it but without a target,
    // in case the event system needs to trace it.

    {
        dispatchEventForLegacyPluginEventSystem(topLevelType, eventSystemFlags, nativeEvent, null);
    }
}


if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
    var fakeNode = document.createElement('react');

    var invokeGuardedCallbackDev = function (name, func, context, a, b, c, d, e, f) {
        // If document doesn't exist we know for sure we will crash in this method
        // when we call document.createEvent(). However this can cause confusing
        // errors: https://github.com/facebookincubator/create-react-app/issues/3482
        // So we preemptively throw with a better message instead.
        if (!(typeof document !== 'undefined')) {
            {
                throw Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
            }
        }

        var evt = document.createEvent('Event'); // Keeps track of whether the user-provided callback threw an error. We
        // set this to true at the beginning, then set it to false right after
        // calling the function. If the function errors, `didError` will never be
        // set to false. This strategy works even if the browser is flaky and
        // fails to call our global error handler, because it doesn't rely on
        // the error event at all.

        var didError = true; // Keeps track of the value of window.event so that we can reset it
        // during the callback to let user code access window.event in the
        // browsers that support it.

        var windowEvent = window.event; // Keeps track of the descriptor of window.event to restore it after event
        // dispatching: https://github.com/facebook/react/issues/13688

        var windowEventDescriptor = Object.getOwnPropertyDescriptor(window, 'event'); // Create an event handler for our fake event. We will synchronously
        // dispatch our fake event using `dispatchEvent`. Inside the handler, we
        // call the user-provided callback.

        var funcArgs = Array.prototype.slice.call(arguments, 3);

        function callCallback() {
            // We immediately remove the callback from event listeners so that
            // nested `invokeGuardedCallback` calls do not clash. Otherwise, a
            // nested call would trigger the fake event handlers of any call higher
            // in the stack.
            fakeNode.removeEventListener(evtType, callCallback, false); // We check for window.hasOwnProperty('event') to prevent the
            // window.event assignment in both IE <= 10 as they throw an error
            // "Member not found" in strict mode, and in Firefox which does not
            // support window.event.

            if (typeof window.event !== 'undefined' && window.hasOwnProperty('event')) {
                window.event = windowEvent;
            }

            func.apply(context, funcArgs);
            didError = false;
        } // Create a global error event handler. We use this to capture the value
        // that was thrown. It's possible that this error handler will fire more
        // than once; for example, if non-React code also calls `dispatchEvent`
        // and a handler for that event throws. We should be resilient to most of
        // those cases. Even if our error event handler fires more than once, the
        // last error event is always used. If the callback actually does error,
        // we know that the last error event is the correct one, because it's not
        // possible for anything else to have happened in between our callback
        // erroring and the code that follows the `dispatchEvent` call below. If
        // the callback doesn't error, but the error event was fired, we know to
        // ignore it because `didError` will be false, as described above.


        var error; // Use this to track whether the error event is ever called.

        var didSetError = false;
        var isCrossOriginError = false;

        function handleWindowError(event) {
            error = event.error;
            didSetError = true;

            if (error === null && event.colno === 0 && event.lineno === 0) {
                isCrossOriginError = true;
            }

            if (event.defaultPrevented) {
                // Some other error handler has prevented default.
                // Browsers silence the error report if this happens.
                // We'll remember this to later decide whether to log it or not.
                if (error != null && typeof error === 'object') {
                    try {
                        error._suppressLogging = true;
                    } catch (inner) { // Ignore.
                    }
                }
            }
        } // Create a fake event type.


        var evtType = "react-" + (name ? name : 'invokeguardedcallback'); // Attach our event handlers

        window.addEventListener('error', handleWindowError);
        fakeNode.addEventListener(evtType, callCallback, false); // Synchronously dispatch our fake event. If the user-provided function
        // errors, it will trigger our global error handler.

        evt.initEvent(evtType, false, false);
        fakeNode.dispatchEvent(evt);

        if (windowEventDescriptor) {
            Object.defineProperty(window, 'event', windowEventDescriptor);
        }

        if (didError) {
            if (!didSetError) {
                // The callback errored, but the error event never fired.
                error = new Error('An error was thrown inside one of your components, but React ' + "doesn't know what it was. This is likely due to browser " + 'flakiness. React does its best to preserve the "Pause on ' + 'exceptions" behavior of the DevTools, which requires some ' + "DEV-mode only tricks. It's possible that these don't work in " + 'your browser. Try triggering the error in production mode, ' + 'or switching to a modern browser. If you suspect that this is ' + 'actually an issue with React, please file an issue.');
            } else if (isCrossOriginError) {
                error = new Error("A cross-origin error was thrown. React doesn't have access to " + 'the actual error object in development. ' + 'See https://fb.me/react-crossorigin-error for more information.');
            }

            this.onError(error);
        } // Remove our event listeners


        window.removeEventListener('error', handleWindowError);
    };

    invokeGuardedCallbackImpl = invokeGuardedCallbackDev;
}

function isReplayableDiscreteEvent(eventType) {
    return discreteReplayableEvents.indexOf(eventType) > -1;
}

function trapBubbledEvent(topLevelType, element) {
    trapEventForPluginEventSystem(element, topLevelType, false);
}

function trapEventForPluginEventSystem(container, topLevelType, capture) {
    var listener;

    switch (getEventPriorityForPluginSystem(topLevelType)) {
        case DiscreteEvent:
            listener = dispatchDiscreteEvent.bind(null, topLevelType, PLUGIN_EVENT_SYSTEM, container);
            break;

        case UserBlockingEvent:
            listener = dispatchUserBlockingUpdate.bind(null, topLevelType, PLUGIN_EVENT_SYSTEM, container);
            break;

        case ContinuousEvent:
        default:
            listener = dispatchEvent.bind(null, topLevelType, PLUGIN_EVENT_SYSTEM, container);
            break;
    }

    var rawEventName = getRawEventName(topLevelType);

    if (capture) {
        addEventCaptureListener(container, rawEventName, listener);
    } else {
        addEventBubbleListener(container, rawEventName, listener);
    }
}

function dispatchDiscreteEvent(topLevelType, eventSystemFlags, container, nativeEvent) {
    flushDiscreteUpdatesIfNeeded(nativeEvent.timeStamp);
    discreteUpdates(dispatchEvent, topLevelType, eventSystemFlags, container, nativeEvent);
}

function dispatchUserBlockingUpdate(topLevelType, eventSystemFlags, container, nativeEvent) {
    runWithPriority(UserBlockingPriority, dispatchEvent.bind(null, topLevelType, eventSystemFlags, container, nativeEvent));
}






function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
    hasError = false;
    caughtError = null;
    invokeGuardedCallbackImpl$1.apply(reporter, arguments);
}

function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {
    invokeGuardedCallback.apply(this, arguments);

    if (hasError) {
        var error = clearCaughtError();

        if (!hasRethrowError) {
            hasRethrowError = true;
            rethrowError = error;
        }
    }
}

function executeDispatch(event, listener, inst) {
    var type = event.type || 'unknown-event';
    event.currentTarget = getNodeFromInstance(inst);
    invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
    event.currentTarget = null;
}


function executeDispatchesInOrder(event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchInstances = event._dispatchInstances;

    {
        validateEventDispatches(event);
    }

    if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
            if (event.isPropagationStopped()) {
                break;
            } // Listeners and Instances are two parallel arrays that are always in sync.


            executeDispatch(event, dispatchListeners[i], dispatchInstances[i]);
        }
    } else if (dispatchListeners) {
        executeDispatch(event, dispatchListeners, dispatchInstances);
    }

    event._dispatchListeners = null;
    event._dispatchInstances = null;
}

var executeDispatchesAndRelease = function (event) {
    if (event) {
        executeDispatchesInOrder(event);

        if (!event.isPersistent()) {
            event.constructor.release(event);
        }
    }
};

var executeDispatchesAndReleaseTopLevel = function (e) {
    return executeDispatchesAndRelease(e);
};


function runEventsInBatch(events) {
    if (events !== null) {
        eventQueue = accumulateInto(eventQueue, events);
    } // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.


    var processingEventQueue = eventQueue;
    eventQueue = null;

    if (!processingEventQueue) {
        return;
    }

    forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);

    if (!!eventQueue) {
        {
            throw Error("processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.");
        }
    } // This would be a good time to rethrow if any of the event handlers threw.


    rethrowCaughtError();
}

function runExtractedPluginEventsInBatch(topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
    var events = extractPluginEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags);
    runEventsInBatch(events);
}


function handleTopLevel(bookKeeping) {
    var targetInst = bookKeeping.targetInst; // Loop through the hierarchy, in case there's any nested components.
    // It's important that we build the array of ancestors before calling any
    // event handlers, because event handlers can modify the DOM, leading to
    // inconsistencies with ReactMount's node cache. See #1105.

    var ancestor = targetInst;

    do {
        if (!ancestor) {
            var ancestors = bookKeeping.ancestors;
            ancestors.push(ancestor);
            break;
        }

        var root = findRootContainerNode(ancestor);

        if (!root) {
            break;
        }

        var tag = ancestor.tag;

        if (tag === HostComponent || tag === HostText) {
            bookKeeping.ancestors.push(ancestor);
        }

        ancestor = getClosestInstanceFromNode(root);
    } while (ancestor);

    for (var i = 0; i < bookKeeping.ancestors.length; i++) {
        targetInst = bookKeeping.ancestors[i];
        var eventTarget = getEventTarget(bookKeeping.nativeEvent);
        var topLevelType = bookKeeping.topLevelType;
        var nativeEvent = bookKeeping.nativeEvent;
        var eventSystemFlags = bookKeeping.eventSystemFlags; // If this is the first ancestor, we mark it on the system flags

        if (i === 0) {
            eventSystemFlags |= IS_FIRST_ANCESTOR;
        }

        runExtractedPluginEventsInBatch(topLevelType, targetInst, nativeEvent, eventTarget, eventSystemFlags);
    }
}

function dispatchEventForLegacyPluginEventSystem(topLevelType, eventSystemFlags, nativeEvent, targetInst) {
    var bookKeeping = getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst, eventSystemFlags);

    try {
        // Event queue being processed in the same cycle allows
        // `preventDefault`.
        batchedEventUpdates(handleTopLevel, bookKeeping);
    } finally {
        releaseTopLevelCallbackBookKeeping(bookKeeping);
    }
}



function getVendorPrefixedEventName(eventName) {
    if (prefixedEventNames[eventName]) {
        return prefixedEventNames[eventName];
    } else if (!vendorPrefixes[eventName]) {
        return eventName;
    }

    var prefixMap = vendorPrefixes[eventName];

    for (var styleProp in prefixMap) {
        if (prefixMap.hasOwnProperty(styleProp)) {
            return prefixedEventNames[eventName] = prefixMap[styleProp];
        }
    }

    return eventName;
}

function unsafeCastStringToDOMTopLevelType(topLevelType) {
    return topLevelType;
}