let a_panfeng = 0

//↓↓↓↓↓↓--------***---------↓↓↓↓↓↓
//↑↑↑↑↑↑--------***---------↑↑↑↑↑↑

const ReactDOM = {}
var workInProgress = null; //工作单元代理变量
var nextEffect = null;
var REACT_ELEMENT_TYPE = Symbol.for('react.element')
var emptyContextObject = {};

var ImmediatePriority = 99;
var renderOk = false;
//我自己定义的变量


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
        return Object.assign(target, ...source)
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
    /* function enqueueUpdate(fiber, update) {

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
    } */

    function enqueueUpdate(fiber, update) {

        //更新后面
        var updateQueue = fiber.updateQueue;

        if (updateQueue === null) {
            // Only occurs if the fiber has been unmounted.
            return;
        }

        var sharedQueue = updateQueue.shared;
        var pending = sharedQueue.pending;

        if (pending === null) {
            // This is the first update. Create a circular list.
            update.next = update;
        } else {
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


        //commitRoot 是最后阶段，不会再被异步调用了，所以会清除callback相关的属性
        root.callbackNode = null;
        /*  root.callbackExpirationTime = NoWork;
         // root.callbackPriority = NoPriority;
         root.nextKnownPendingLevel = NoWork; */

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
                    /*  case ForwardRef:
                     case SimpleMemoComponent:
                     case Block: {
                         return;
                     } */
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
                    /* case HostPortal:
                    case IncompleteClassComponent:
                        // Nothing to do for these component types
                        return; */
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

        function commitDeletion(finishedRoot, current, renderPriorityLevel) {
            {
                // Recursively delete all host nodes from the parent.
                // Detach refs and call componentWillUnmount() on the whole subtree.
                unmountHostComponents(finishedRoot, current, renderPriorityLevel);
            }

            detachFiber(current);
        }


        function commitNestedUnmounts(finishedRoot, root, renderPriorityLevel) {
            // While we're inside a removed host node we don't want to call
            // removeChild on the inner nodes because they're removed by the top
            // call anyway. We also want to call componentWillUnmount on all
            // composites before this host node is removed from the tree. Therefore
            // we do an inner loop while we're still inside the host node.
            var node = root;

            while (true) {
                commitUnmount(finishedRoot, node, renderPriorityLevel); // Visit children because they may contain more composite or host nodes.
                // Skip portals because commitUnmount() currently visits them recursively.

                if (node.child !== null && ( // If we use mutation we drill down into portals using commitUnmount above.
                        // If we don't use mutation we drill down into portals here instead.
                        node.tag !== HostPortal)) {
                    node.child.return = node;
                    node = node.child;
                    continue;
                }

                if (node === root) {
                    return;
                }

                while (node.sibling === null) {
                    if (node.return === null || node.return === root) {
                        return;
                    }

                    node = node.return;
                }

                node.sibling.return = node.return;
                node = node.sibling;
            }
        }

        function removeChildFromContainer(container, child) {
            if (container.nodeType === COMMENT_NODE) {
                container.parentNode.removeChild(child);
            } else {
                container.removeChild(child);
            }
        }

        function removeChild(parentInstance, child) {
            parentInstance.removeChild(child);
        }



        function commitUnmount(finishedRoot, current, renderPriorityLevel) {
            // onCommitUnmount(current);

            switch (current.tag) {
                /* case FunctionComponent:
              case ForwardRef:
              case MemoComponent:
              case SimpleMemoComponent:
              case Block: {
                var updateQueue = current.updateQueue;
      
                if (updateQueue !== null) {
                  var lastEffect = updateQueue.lastEffect;
      
                  if (lastEffect !== null) {
                    var firstEffect = lastEffect.next;
      
                    {
                      // When the owner fiber is deleted, the destroy function of a passive
                      // effect hook is called during the synchronous commit phase. This is
                      // a concession to implementation complexity. Calling it in the
                      // passive effect phase (like they usually are, when dependencies
                      // change during an update) would require either traversing the
                      // children of the deleted fiber again, or including unmount effects
                      // as part of the fiber effect list.
                      //
                      // Because this is during the sync commit phase, we need to change
                      // the priority.
                      //
                      // TODO: Reconsider this implementation trade off.
                      var priorityLevel = renderPriorityLevel > NormalPriority ? NormalPriority : renderPriorityLevel;
                      runWithPriority$1(priorityLevel, function () {
                        var effect = firstEffect;
      
                        do {
                          var _destroy = effect.destroy;
      
                          if (_destroy !== undefined) {
                            safelyCallDestroy(current, _destroy);
                          }
      
                          effect = effect.next;
                        } while (effect !== firstEffect);
                      });
                    }
                  }
                }
      
                return;
              } */

                case ClassComponent: {
                    //safelyDetachRef(current);
                    var instance = current.stateNode;

                    if (typeof instance.componentWillUnmount === 'function') {
                        instance.componentWillUnmount()
                        // safelyCallComponentWillUnmount(current, instance);
                    }

                    return;
                }

                case HostComponent: {

                    //safelyDetachRef(current);
                    return;
                }

                /*   case HostPortal: {
                // TODO: this is recursive.
                // We are also not using this parent because
                // the portal will get pushed immediately.
                {
                  unmountHostComponents(finishedRoot, current, renderPriorityLevel);
                }
      
                return;
              }
      
              case FundamentalComponent: {
      
                return;
              }
      
              case DehydratedFragment: {
      
                return;
              }
      
              case ScopeComponent: {
      
                return;
              } */
            }
        }

        function unmountHostComponents(finishedRoot, current, renderPriorityLevel) {
            // We only have the top Fiber that was deleted but we need to recurse down its
            // children to find all the terminal nodes.
            var node = current; // Each iteration, currentParent is populated with node's host parent if not
            // currentParentIsValid.

            var currentParentIsValid = false; // Note: these two variables *must* always be updated together.

            var currentParent;
            var currentParentIsContainer;

            while (true) {
                if (!currentParentIsValid) {
                    var parent = node.return;

                    findParent: while (true) {
                        if (!(parent !== null)) {
                            {
                                throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
                            }
                        }

                        var parentStateNode = parent.stateNode;

                        switch (parent.tag) {
                            case HostComponent:
                                currentParent = parentStateNode;
                                currentParentIsContainer = false;
                                break findParent;

                            case HostRoot:
                                currentParent = parentStateNode.containerInfo;
                                currentParentIsContainer = true;
                                break findParent;

                            case HostPortal:
                                currentParent = parentStateNode.containerInfo;
                                currentParentIsContainer = true;
                                break findParent;

                        }

                        parent = parent.return;
                    }

                    currentParentIsValid = true;
                }

                if (node.tag === HostComponent || node.tag === HostText) {
                    commitNestedUnmounts(finishedRoot, node, renderPriorityLevel); // After all the children have unmounted, it is now safe to remove the
                    // node from the tree.

                    if (currentParentIsContainer) {
                        removeChildFromContainer(currentParent, node.stateNode);
                    } else {
                        removeChild(currentParent, node.stateNode);
                    } // Don't visit children because we already visited them.

                } else if (node.tag === HostPortal) {
                    if (node.child !== null) {
                        // When we go into a portal, it becomes the parent to remove from.
                        // We will reassign it back when we pop the portal on the way up.
                        currentParent = node.stateNode.containerInfo;
                        currentParentIsContainer = true; // Visit children because portals might contain host components.

                        node.child.return = node;
                        node = node.child;
                        continue;
                    }
                } else {
                    commitUnmount(finishedRoot, node, renderPriorityLevel); // Visit children because we may find more host components below.

                    if (node.child !== null) {
                        node.child.return = node;
                        node = node.child;
                        continue;
                    }
                }

                if (node === current) {
                    return;
                }

                while (node.sibling === null) {
                    if (node.return === null || node.return === current) {
                        return;
                    }

                    node = node.return;

                    if (node.tag === HostPortal) {
                        // When we go out of the portal, we need to restore the parent.
                        // Since we don't keep a stack of them, we will search for it.
                        currentParentIsValid = false;
                    }
                }

                node.sibling.return = node.return;
                node = node.sibling;
            }
        }

        function detachFiber(current) {
            var alternate = current.alternate; // Cut off the return pointers to disconnect it from the tree. Ideally, we
            // should clear the child pointer of the parent alternate to let this
            // get GC:ed but we don't know which for sure which parent is the current
            // one so we'll settle for GC:ing the subtree of this child. This child
            // itself will be GC:ed when the parent updates the next time.

            current.return = null;
            current.child = null;
            current.memoizedState = null;
            current.updateQueue = null;
            current.dependencies = null;
            current.alternate = null;
            current.firstEffect = null;
            current.lastEffect = null;
            current.pendingProps = null;
            current.memoizedProps = null;
            current.stateNode = null;

            if (alternate !== null) {
                detachFiber(alternate);
            }
        }

    }
    //↑↑↑↑↑↑--------commitMutationEffects---------↑↑↑↑↑↑


    //↓↓↓↓↓↓--------commitLayoutEffects---------↓↓↓↓↓↓
    {
        function commitLayoutEffects(root, committedExpirationTime) {

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
            } else if (propKey.substr(0, 2) == "on") {
                // console.log("action",propKey.toLowerCase().substring(2))
                domListen(domElement, propKey.toLowerCase().substring(2), nextProp)

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


            if (nextChildren === prevChildren) {
                // If the state is the same as before, that's a bailout because we had
                // no work that expires at this time.

                return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
            }


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
            debugger

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

        while (workInProgress !== null) {
            console.log(++a_panfeng, "------------------")
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

        debugger
        var expirationTime = Sync;

        //给全局的workInProgress变量赋值
        //第一次的workInProgress的值，就是根据fiberRoot.current创建的，就是HostRoot,下一个根据<APP/>
        //
        prepareFreshStack(root, expirationTime);

        //完成workInProgress携带的工作 ，即完成fiber分析
        workLoopSync()


        //commitfiber
        root.finishedWork = root.current.alternate;
        root.finishedExpirationTime = expirationTime;


        finishSyncRender(root);

        return null;

    }

    //安排工作
    //expirationTime === Sync执行同步渲染。浏览器端就是这里
    function scheduleWork(fiber, expirationTime) {
        //let root = fiber.stateNode;
        var root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
        //这里的fiber参数，传递的是fiberRoot.current
        //而fiberRoot.current.stateNode仍然指向fiberRoot----- legacyCreateRootFromDOMContainer函数里面指定的，uninitializedFiber.stateNode = root;
        //所以这里的root就是fiberRoot
        //搞得好绕，总之：root指的是fiberRoot，fiber数据结构的根节点
        if (expirationTime === Sync && !renderOk) {
            // 在根目录上执行同步工作
            performSyncWorkOnRoot(root);
            renderOk = true
        } else {
            ensureRootIsScheduled(root);
            //schedulePendingInteractions(root, expirationTime);
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


//↓↓↓↓↓↓--------dom事件--me---------↓↓↓↓↓↓
{
    function domListen(dom, event, callBack) {
        dom.addEventListener(event, callBack)

    }

    /* var config = { DOMNodeRemoved: true };
    
    
    var observer = new MutationObserver(function (mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.type == 'childList') {
                console.log('子元素被修改');
            }
            else if (mutation.type == 'attributes') {
                console.log(mutation.attributeName + '属性被修改');
            }
        }
    });
    
    
    //开始观测
    observer.observe(box, config); */
}
//↑↑↑↑↑↑--------render主流程--me---------↑↑↑↑↑↑



//↓↓↓↓↓↓--------setState和forceUpdate---------↓↓↓↓↓↓

{

    function isMounted(component) {
        {
            var owner = ReactCurrentOwner.current;

            if (owner !== null && owner.tag === ClassComponent) {
                var ownerFiber = owner;
                var instance = ownerFiber.stateNode;

                if (!instance._warnedAboutRefsInRender) {
                    error('%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(ownerFiber.type) || 'A component');
                }

                instance._warnedAboutRefsInRender = true;
            }
        }

        var fiber = get(component);

        if (!fiber) {
            return false;
        }

        return getNearestMountedFiber(fiber) === fiber;
    }


    var classComponentUpdater = {
        isMounted: isMounted,
        enqueueSetState: function (inst, payload, callback) {
            debugger
            //
            var fiber = get(inst);

            console.log(fiber)
            var currentTime = requestCurrentTimeForUpdate();
            //var suspenseConfig = requestCurrentSuspenseConfig();
            var suspenseConfig = {};
            var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
            var update = createUpdate(expirationTime, suspenseConfig);
            update.payload = payload;

            if (callback !== undefined && callback !== null) {
                {
                    warnOnInvalidCallback(callback, 'setState');
                }
                update.callback = callback;
            }
            enqueueUpdate(fiber, update);
            scheduleWork(fiber, expirationTime);
            //上面和ReactDOM.render中scheduleRootUpdate非常的相似。其实他们就是同一个更新原理呢
            /*  （1）获取节点对应的fiber对象
               （2）计算currentTime
               （3）根据（1）fiber和（2）currentTime计算fiber对象的expirationTime
               （4）根据（3）expirationTime创建update对象
               （5）将setState中要更新的对象赋值到（4）update.payload，ReactDOM.render是{element}
               （6）将callback赋值到（4）update.callback
               （7）update入队updateQueue
               （8）进行任务调度 
             */
        },
        enqueueReplaceState: function (inst, payload, callback) {
            var fiber = get(inst);
            var currentTime = requestCurrentTimeForUpdate();
            //var suspenseConfig = requestCurrentSuspenseConfig();
            var suspenseConfig = {};
            var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
            var update = createUpdate(expirationTime, suspenseConfig);
            update.tag = ReplaceState;
            update.payload = payload;

            if (callback !== undefined && callback !== null) {
                {
                    warnOnInvalidCallback(callback, 'replaceState');
                }

                update.callback = callback;
            }

            enqueueUpdate(fiber, update);
            scheduleWork(fiber, expirationTime);
        },
        enqueueForceUpdate: function (inst, callback) {
            var fiber = get(inst);
            var currentTime = requestCurrentTimeForUpdate();
            //var suspenseConfig = requestCurrentSuspenseConfig();
            var suspenseConfig = {};
            var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
            var update = createUpdate(expirationTime, suspenseConfig);
            //update.tag = ForceUpdate;
            update.tag = 2;

            if (callback !== undefined && callback !== null) {
                {
                    warnOnInvalidCallback(callback, 'forceUpdate');
                }

                update.callback = callback;
            }

            enqueueUpdate(fiber, update);
            scheduleWork(fiber, expirationTime);

            /*  （1）获取节点对应的fiber对象
                （2）计算currentTime
                （3）根据（1）fiber和（2）currentTime计算fiber对象的expirationTime
                （4）根据（3）expirationTime创建update对象
                （5）将setState中要更新的对象赋值到（4）update.payload，ReactDOM.render是{element}
                （6）将callback赋值到（4）update.callback
                （7）update入队updateQueue
                （8）进行任务调度 
              */
        }
    };


    function ensureRootIsScheduled(root) {
        //var lastExpiredTime = root.lastExpiredTime;

        var existingCallbackNode = root.callbackNode;
        if (existingCallbackNode !== null) {
            return
        }

        root.callbackExpirationTime = Sync;
        root.callbackPriority = ImmediatePriority;
        //root.callbackNode = scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
        root.callbackNode = runTask_panfeng(() => {
            performSyncWorkOnRoot(root)
        })

        //commit之前会重置这个callbackNode
    }

    //跟踪需要同步执行的update们，并计数、检测它们是否会报错


    function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
        // Update the source fiber's expiration time
        //如果fiber对象的过期时间小于 expirationTime，则更新fiber对象的过期时间
        //也就是说，当前fiber的优先级是小于expirationTime的优先级的，现在要调高fiber的优先级
        if (fiber.expirationTime < expirationTime) {
            fiber.expirationTime = expirationTime;
        }
        //在enqueueUpdate()中有讲到，与fiber.current是映射关系
        var alternate = fiber.alternate;
        //同上
        if (alternate !== null && alternate.expirationTime < expirationTime) {
            alternate.expirationTime = expirationTime;
        } // Walk the parent path to the root and update the child expiration time.

        //向上遍历父节点，直到root节点，在遍历的过程中更新子节点的expirationTime
        var node = fiber.return;
        var root = null;

        if (node === null && fiber.tag === HostRoot) {
            root = fiber.stateNode;
        } else {
            while (node !== null) {
                alternate = node.alternate;

                if (node.childExpirationTime < expirationTime) {
                    node.childExpirationTime = expirationTime;

                    if (alternate !== null && alternate.childExpirationTime < expirationTime) {
                        alternate.childExpirationTime = expirationTime;
                    }
                } else if (alternate !== null && alternate.childExpirationTime < expirationTime) {
                    alternate.childExpirationTime = expirationTime;
                }

                if (node.return === null && node.tag === HostRoot) {
                    root = node.stateNode;
                    break;
                }

                node = node.return;
            }
        }



        return root;
    }

    function bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime) {
        // cancelWorkTimer(workInProgress);

        if (current !== null) {
            // Reuse previous dependencies
            workInProgress.dependencies = current.dependencies;
        }

        cloneChildFibers(current, workInProgress);
        return workInProgress.child;


        var childExpirationTime = workInProgress.childExpirationTime;

    }

    function cloneChildFibers(current, workInProgress) {
        if (!(current === null || workInProgress.child === current.child)) {
            {
                throw Error("Resuming work not yet implemented.");
            }
        }

        if (workInProgress.child === null) {
            return;
        }

        var currentChild = workInProgress.child;
        var newChild = createWorkInProgress(currentChild, currentChild.pendingProps);
        workInProgress.child = newChild;
        newChild.return = workInProgress;

        while (currentChild.sibling !== null) {
            currentChild = currentChild.sibling;
            newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps);
            newChild.return = workInProgress;
        }

        newChild.sibling = null;
    }


    function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
        var instance = workInProgress.stateNode;

        if (typeof instance.shouldComponentUpdate === 'function') {
            {
                /* if (workInProgress.mode & StrictMode) {
                    // Invoke the function an extra time to help detect side-effects.
                    instance.shouldComponentUpdate(newProps, newState, nextContext);
                } */
                instance.shouldComponentUpdate(newProps, newState, nextContext);
            }

            var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);

            {
                if (shouldUpdate === undefined) {
                    console.error('%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', getComponentName(ctor) || 'Component');
                }
            }

            return shouldUpdate;
        }

        if (ctor.prototype && ctor.prototype.isPureReactComponent) {
            // return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
        }

        return true;
    }

    function updateClassInstance(current, workInProgress, ctor, newProps, renderExpirationTime) {
        var instance = workInProgress.stateNode;
        cloneUpdateQueue(current, workInProgress);
        var oldProps = workInProgress.memoizedProps;
        instance.props = workInProgress.type === workInProgress.elementType ? oldProps : resolveDefaultProps(workInProgress.type, oldProps);
        var oldContext = instance.context;
        var contextType = ctor.contextType;
        var nextContext = emptyContextObject
        /*  var nextContext = emptyContextObject;
    
        if (typeof contextType === 'object' && contextType !== null) {
            nextContext = readContext(contextType);
        } else {
            var nextUnmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
            nextContext = getMaskedContext(workInProgress, nextUnmaskedContext);
        }
     */
        var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
        var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function'; // Note: During these life-cycles, instance.props/instance.state are what
        // ever the previously attempted to render - not the "current". However,
        // during componentDidUpdate we pass the "current" props.
        // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for components using the new APIs.

        /* if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === 'function' || typeof instance.componentWillReceiveProps === 'function')) {
            if (oldProps !== newProps || oldContext !== nextContext) {
                callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext);
            }
        } */

        // resetHasForceUpdateBeforeProcessing();
        var oldState = workInProgress.memoizedState;
        var newState = instance.state = oldState;
        processUpdateQueue(workInProgress, newProps, instance, renderExpirationTime);
        newState = workInProgress.memoizedState;

        if (oldProps === newProps && oldState === newState) {
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

        var shouldUpdate = checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext);

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
}
//↑↑↑↑↑↑--------setState和forceUpdate---------↑↑↑↑↑↑

function runTask_panfeng(fn) {
    setTimeout(() => {
        fn()
    }, 0);

    return "任务获取到了"
}