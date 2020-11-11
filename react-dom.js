const ReactDOM = {}
var workInProgress = null; //工作单元代理变量
var nextEffect = null;

var MAX_SIGNED_31_BIT_INT = 1073741823;
var NoWork = 0;
var Never = 1;
var Idle = 2;
var ContinuousHydration = 3;
var Sync = MAX_SIGNED_31_BIT_INT; //1073741823;
var Batched = Sync - 1; //1073741822;
var UNIT_SIZE = 10;
var MAGIC_NUMBER_OFFSET = Batched - 1; // 1 unit of expiration time represents 10ms. //1073741821


var FunctionComponent = 0;
var ClassComponent = 1;
var IndeterminateComponent = 2; // Before we know whether it is function or class
var HostRoot = 3; // Root of a host tree. Could be nested inside another node.
var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
var HostComponent = 5;
var HostText = 6;


// Don't change these two values. They're used by React Dev Tools.
var NoEffect =
    /*              */
    0;
var PerformedWork =
    /*         */
    1; // You can change the rest (and add more).

var Placement =
    /*             */
    2;
var Update =
    /*                */
    4;
var PlacementAndUpdate =
    /*    */
    6;
var Deletion =
    /*              */
    8;
var ContentReset =
    /*          */
    16;
var Callback =
    /*              */
    32;
var DidCapture =
    /*            */
    64;
var Ref =
    /*                   */
    128;
var Snapshot =
    /*              */
    256;
var Passive =
    /*               */
    512;
var Hydrating =
    /*             */
    1024;
var HydratingAndUpdate =
    /*    */
    1028; // Passive & Update & Callback & Ref & Snapshot

var LifecycleEffectMask =
    /*   */
    932; // Union of all host effects

var HostEffectMask =
    /*        */
    2047;
var Incomplete =
    /*            */
    2048;
var ShouldCapture =
    /*         */
    4096;




var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;

//↓↓↓↓↓↓--------***---------↓↓↓↓↓↓
//↑↑↑↑↑↑--------***---------↑↑↑↑↑↑



var REACT_ELEMENT_TYPE = Symbol.for('react.element')
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


    function createFiberFromElement(element, mode, expirationTime) {
        var owner = null;

        var type = element.type;
        var key = element.key;
        var pendingProps = element.props;
        var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime);

        return fiber;
    }

    function createFiberFromFragment(elements, mode, expirationTime, key) {
        var fiber = createFiber(Fragment, elements, key, mode);
        fiber.expirationTime = expirationTime;
        return fiber;
    }

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
                default: {

                }
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


    //fiber节点初始化updateQueue属性。
    //即fiber.updateQueue已经有一个初始化后的queue对象结构
    //queue对象会保留fiber本身的memoizedState值，存在baseState中
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

}
//↑↑↑↑↑↑--------关于update对象的函数---------↑↑↑↑↑↑




function markUpdate(workInProgress) {
    // Tag the fiber with an update effect. This turns a Placement into
    // a PlacementAndUpdate.
    workInProgress.effectTag |= Update;
}

function shouldSetTextContent(type, props) {
    return type === 'textarea' || type === 'option' || type === 'noscript' || typeof props.children === 'string' || typeof props.children === 'number' || typeof props.dangerouslySetInnerHTML === 'object' && props.dangerouslySetInnerHTML !== null && props.dangerouslySetInnerHTML.__html != null;
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










var classComponentUpdater = {}

// var classComponentUpdater = {
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


function mountClassInstance(workInProgress, ctor, newProps, renderExpirationTime) {

    var instance = workInProgress.stateNode;
    instance.props = newProps;
    instance.state = workInProgress.memoizedState;
    //instance.refs = emptyRefsObject;
    //初始化更新队列
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
        // applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, newProps);
        instance.state = workInProgress.memoizedState;
    } // In order to support react-lifecycles-compat polyfilled components,
    // Unsafe lifecycles should not be invoked for components using the new APIs.
    //判断是否有componentWillMount生命周期并且执行，这个生命周期也可能改变State
    if (typeof ctor.getDerivedStateFromProps !== 'function' && typeof instance.getSnapshotBeforeUpdate !== 'function' && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
        //先注释生命周期
        //callComponentWillMount(workInProgress, instance); // If we had additional state updates during this life-cycle, let's
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


function adoptClassInstance(workInProgress, instance) {
    instance.updater = classComponentUpdater;
    workInProgress.stateNode = instance; // The instance needs access to the fiber so that it can schedule updates

    set(instance, workInProgress);
}

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

function updateClassComponent(current, workInProgress, Component, nextProps, renderExpirationTime) {
    //省略很多代码
    //构建类实例---返回的实例没使用
    //类实体挂载在了workInProgress的statenode上面

    var instance = workInProgress.stateNode;
    var shouldUpdate;

    if (instance === null) {
        if (current !== null) {
            current.alternate = null;
            workInProgress.alternate = null;
            workInProgress.effectTag |= Placement;
        }
        //1、创建一个class组件实例（instance），即业务中写好的class component。
        // 2、将实例赋值给stateNode属性：workInProgress.stateNode = instance
        //3、将classComponentUpdater挂载到instance.updater 上;
        constructClassInstance(workInProgress, Component, nextProps);

        /*  mountClassInstance
         1、从updateQueue里面获取到所有的要更新的state，调用processUpdateQueue函数遍历updateQueue，遍历的过程会判断每个update的优先级，决定是否要跳过这个更新。
         2、如果这个update需要更新，调用getStateFromUpdate获取到新的state。
         3、更新成最新的state：instance.state = workInProgress.memoizedState;
         4、调用React新的生命周期函数：getDerivedStateFromProps并且执行，这个生命周期可能改变State，所以再次需要instance.state = workInProgress.memoizedState
         5、如果没有使用getDerivedStateFromProps而使用componentWillMount，这里为了兼容旧版。执行componentWillMount，这个生命周期可能改变State。
         6、最后标记 componentDidMount 生命周期，待到提交阶段更新完 dom 后执行 
         */
        mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
    } else {

    }

    var nextUnitOfWork = finishClassComponent(current, workInProgress, Component, shouldUpdate, null, renderExpirationTime);

    return nextUnitOfWork;
}

function shouldSetTextContent(type, props) {
    return type === 'textarea' || type === 'option' || type === 'noscript' || typeof props.children === 'string' || typeof props.children === 'number' || typeof props.dangerouslySetInnerHTML === 'object' && props.dangerouslySetInnerHTML !== null && props.dangerouslySetInnerHTML.__html != null;
}

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


function updateHostText(current, workInProgress) {
    return null;
}



function createElement(type, props, rootContainerElement, parentNamespace) {

    domElement = document.createElement(type);
    return domElement;
}

function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    //
    var domElement = createElement(type, props, rootContainerInstance, parentNamespace = null);
    domElement.__reactEventHandlers = props;
    return domElement;
}

function createTextNode(text, rootContainerElement) {
    return document.createTextNode(text);
}

function createTextInstance(text) {

    var textNode = createTextNode(text);

    return textNode;
}

function appendInitialChild(parentInstance, child) {

    parentInstance.appendChild(child);
}

function appendAllChildren(parent, workInProgress, ) {
    // We only have the top Fiber that was created but we need recurse down its
    // children to find all the terminal nodes.
    var node = workInProgress.child;
    while (node !== null) {
        //寻找DOM化的子元素
        if (node.tag === HostComponent || node.tag === HostText) {
            //将dom化的子元素，插入自身结构

            appendInitialChild(parent, node.stateNode);
        } else if (node.tag === HostPortal);
        else if (node.child !== null) {
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
        }
    }
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


function setInitialProperties(domElement, tag, rawProps, rootContainerElement) {
    //通过setInitialProperties方法对 DomElement 的属性进行初始化，而<code>节点的内容、样式、class、事件 Handler等等也是这个时候存放进去的

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
            if (typeof props.onClick === 'function') {
                // TODO: This cast may not be sound for SVG, MathML or custom elements.
                // trapClickOnNonInteractiveElement(domElement);
            }

            break;
    }
}
// Calculate the diff between the two objects.

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
            //popHostContext(workInProgress);
            //var rootContainerInstance = getRootHostContainer();
            var rootContainerInstance = document;
            var type = workInProgress.type;

            var instance = createInstance(type, newProps, rootContainerInstance, currentHostContext = null, workInProgress);
            appendAllChildren(instance, workInProgress, false, false);
            // This needs to be set before we mount Flare event listeners
            workInProgress.stateNode = instance;
            // (eg DOM renderer supports auto-focus for certain elements).
            // Make sure such renderers get scheduled for later work.

            //对 DomElement 的属性进行初始化，而<code>节点的文字内容、样式、class、事件 Handler等等也是这个时候存放进去的。

            if (finalizeInitialChildren(instance, type, newProps, rootContainerInstance)) {
                markUpdate(workInProgress);
            }

            markUpdate(workInProgress);
            return null;


        }
        case HostText: {
            var newText = newProps;

            if (current && workInProgress.stateNode != null) {
                var oldText = current.memoizedProps;
                // If we have an alternate, that means this is an update and we need
                // to schedule a side-effect to do the updates.
                if (oldText !== newText) {
                    markUpdate(workInProgress);
                }
            }

            workInProgress.stateNode = createTextInstance(newText);
            return null;
        }

    }

    return null
}

function completeUnitOfWork(unitOfWork) {
    /* 1、根据是否中断调用不同的处理方法
    2、判断是否有兄弟节点来执行不同的操作
    3、完成节点之后赋值effect链 */
    workInProgress = unitOfWork;
    do {
        var current = workInProgress.alternate;
        var returnFiber = workInProgress.return;
        var next = void 0;
        next = completeWork(current, workInProgress, renderExpirationTime = null)
        //resetChildExpirationTime(workInProgress);
        if (next !== null) {
            // Completing this fiber spawned new work. Work on that next.
            return next;
        }


        // 构建 effect 链，供 commitRoot 提交阶段使用
        if (returnFiber !== null && // Do not append effects to parents if a sibling failed to complete
            (returnFiber.effectTag & Incomplete) === NoEffect) {
            // Append all the effects of the subtree and this fiber onto the effect
            // list of the parent. The completion order of the children affects the
            // side-effect order.

            // 把自己身上的effect链粘在父节点的effect后面
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

            // 发现自己本身也有effect ， 那么要把自己也加入父节点的effect链上
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
        } // Otherwise, return to the parent
        workInProgress = returnFiber;
    } while (workInProgress !== null)
    return null;
}





function performSyncWorkOnRoot(root) {

    var expirationTime = Sync;


    //给全局的workInProgress变量赋值
    prepareFreshStack(root, expirationTime);

    //完成fiber分析
    workLoopSync()

    console.log(document.getElementById('root')._reactRootContainer)
    //commitfiber
    root.finishedWork = root.current.alternate;
    root.finishedExpirationTime = expirationTime;


    finishSyncRender(root);

    return null;

}


function finishSyncRender(root) {
    // Set this to null to indicate there's no in-progress render.
    // workInProgressRoot = null;
    commitRoot(root);
}

function commitRoot(root) {
    commitRootImpl(root, renderPriorityLevel = null);
    return null;
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


function commitBeforeMutationEffects() {
    while (nextEffect !== null) {
        var effectTag = nextEffect.effectTag;
        if ((effectTag & Snapshot) !== NoEffect) {
            var current = nextEffect.alternate;
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
                    var snapshot = instance.getSnapshotBeforeUpdate("hello-getSnapshotBeforeUpdate");
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

//将该 DOM 节点的 value 设置为 ''
function resetTextContent(domElement) {
    setTextContent(domElement, '');
}
//重置文字内容
function commitResetTextContent(current) {

    resetTextContent(current.stateNode);
}

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

function isHostParent(fiber) {
    return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
}

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
    //将fiber树递归转换为dom结构

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

function insertInContainerBefore(container, child, beforeChild) {
    if (container.nodeType === COMMENT_NODE) {
        container.parentNode.insertBefore(child, beforeChild);
    } else {
        container.insertBefore(child, beforeChild);
    }
}

function appendChildToContainer(container, child) {

    var parentNode;

    if (container.nodeType === COMMENT_NODE) {
        parentNode = container.parentNode;
        parentNode.insertBefore(child, container);
    } else {
        parentNode = container;
        parentNode.appendChild(child);
    } // This container might be used for a portal.
}

function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {

    var tag = node.tag;
    var isHost = tag === HostComponent || tag === HostText;

    if (isHost) {
        //stateNode是整理好的dom树结构，可以之间insert进dom中
        var stateNode = isHost ? node.stateNode : node.stateNode.instance;

        if (before) {
            insertInContainerBefore(parent, stateNode, before);
        } else {
            appendChildToContainer(parent, stateNode);
        }
    } else if (tag === HostPortal);
    else {
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

function commitPlacement(finishedWork) {

    console.log(finishedWork)

    //向上循环祖先节点，返回是 DOM 元素的父节点(如果不是dom元素，如是class元素就不是dom，继续网上找)
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
        insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
    } else {
        insertOrAppendPlacementNode(finishedWork, before, parent);
    }
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

function commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
    // Update the props handle so that we know which props are the ones with
    // with current event handlers.
    // Apply the diff to the DOM node.

    domElement.__reactEventHandlers = newProps

    updateProperties(domElement, updatePayload, type, oldProps, newProps);
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
                if (_root.hydrate) {
                    // We've just hydrated. No need to hydrate again.
                    _root.hydrate = false;
                    commitHydratedContainer(_root.containerInfo);
                }
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

//提交突变效应
function commitMutationEffects(root, renderPriorityLevel) {
    // 在这之前，root的数据结构关系，已经迭代完成
    //
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
            case Placement: {
                //针对该节点及子节点进行插入操作
                commitPlacement(nextEffect); // Clear the "placement" from effect tag so that we know that this is
                // inserted, before any life-cycles like componentDidMount gets called.
                // TODO: findDOMNode doesn't rely on this any more but isMounted does
                // and isMounted is deprecated anyway so we should be able to kill this.

                nextEffect.effectTag &= ~Placement;
                break;
            }

            case PlacementAndUpdate: {
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

            case Hydrating: {
                nextEffect.effectTag &= ~Hydrating;
                break;
            }

            case HydratingAndUpdate: {
                nextEffect.effectTag &= ~Hydrating; // Update

                var _current2 = nextEffect.alternate;
                commitWork(_current2, nextEffect);
                break;
            }
            //更新节点
            //旧节点->新节点
            case Update: {
                var _current3 = nextEffect.alternate;
                commitWork(_current3, nextEffect);
                break;
            }

            case Deletion: {
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

function commitLayoutEffects(root, committedExpirationTime) {
    //debugger
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

function commitRootImpl(root, renderPriorityLevel) {


    //调度完的任务
    var finishedWork = root.finishedWork;
    //调度完的优先级
    var expirationTime = root.finishedExpirationTime;


    //表示该节点没有要更新的任务，直接 return
    if (finishedWork === null) {
        return null;
    }

    //赋值给变量 finishedWork、expirationTime 后重置成初始值
    //因为下面在对finishedWork、expirationTime 进行 commit后，任务就完成了
    root.finishedWork = null;
    root.finishedExpirationTime = NoWork;

    //获取 effect 链

    var firstEffect;

    //如果RootFiber 的 effectTag 有值的话，也就是说RootFiber也要commit的话
    //将它的 finishedWork 也插入到 effect 链上，放到effect 链的最后 lastEffect.nextEffect 上
    if (finishedWork.effectTag > PerformedWork) {
        // A fiber's effect list consists only of its children, not itself. So if
        // the root has an effect, we need to add it to the end of the list. The
        // resulting list is the set that would belong to the root's parent, if it
        // had one; that is, all the effects in the tree including the root.
        if (finishedWork.lastEffect !== null) {
            finishedWork.lastEffect.nextEffect = finishedWork;
            firstEffect = finishedWork.firstEffect;
        } else {
            firstEffect = finishedWork;
        }
    } else {
        // There is no effect on the root.
        firstEffect = finishedWork.firstEffect;
    }

    //effect链上第一个需要更新的 fiber 对象
    if (firstEffect !== null) {

        // The commit phase is broken into several sub-phases. We do a separate pass
        // of the effect list for each phase: all mutation effects come before all
        // layout effects, and so on.
        // 提交阶段分为几个子阶段。我们对每个阶段的效果列表进行单独的遍历:所有的mutation(突变)效果都在所有的layout效果之前

        // The first phase a "before mutation" phase. We use this phase to read the
        // state of the host tree right before we mutate it. This is where
        // getSnapshotBeforeUpdate is called.
        //标记开始进行「before mutation」子阶段了

        //更新当前选中的DOM节点，一般为 document.activeElement || document.body

        nextEffect = firstEffect;
        //
        do {
            //调用的回调
            //调用 classComponent 上的生命周期方法 getSnapshotBeforeUpdate

            //fiber的dom变化情况已经分析完毕，在commit到真实的dom之前，如果class组件有getSnapshotBeforeUpdate函数，
            //调用该函数，getSnapshotBeforeUpdate的返回值将做为componentDidUpdate的第三个参数
            //很少使用，主要用来获取dom的信息，如滚动条等
            //invokeGuardedCallback(null, commitBeforeMutationEffects, null);
            commitBeforeMutationEffects()


        } while (nextEffect !== null);
        //

        nextEffect = firstEffect;
        //在这之前已经把root的内部html树结构迭代完成了 firstEffect的child的statenode就是
        console.log("---22656")
        console.log(nextEffect)

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



//↓↓↓↓↓↓--------***---------↓↓↓↓↓↓

//↑↑↑↑↑↑--------***---------↑↑↑↑↑↑



//↓↓↓↓↓↓--------reconcileChildren---------↓↓↓↓↓↓
{

    function reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime) {
        if (current === null) {
            workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
        } else {
            workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
        }
    }

    var reconcileChildFibers = ChildReconciler(true);
    var mountChildFibers = ChildReconciler(false);

    function ChildReconciler(shouldTrackSideEffects) {


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

        function reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
            var key = element.key;
            var child = currentFirstChild;

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

        function reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
            //根据子元素的类型，进行对象的处理
            //如：类、数组、文本，改怎么判断和处理
            var isObject = typeof newChild === 'object' && newChild !== null;
            //子元素是对象时
            //判断子元素的类型
            if (isObject) {
                switch (newChild.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                        //REACT_ELEMENT_TYPE=REACT_ELEMENT_TYPE
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

    //↓↓↓↓↓↓--------workInProgress.tag为fiber根组件---------↓↓↓↓↓↓
    {
        function updateHostRoot(current, workInProgress, renderExpirationTime) {
            var nextProps = workInProgress.pendingProps;
            var prevState = workInProgress.memoizedState;
            var prevChildren = prevState !== null ? prevState.element : null;
            //clone
            cloneUpdateQueue(current, workInProgress);
            //通过processUpdateQueue 计算新的state赋值到 fiber workInProgress.memoizedState 和 instance 上面记录
            processUpdateQueue(workInProgress, nextProps, null, renderExpirationTime);

            var nextState = workInProgress.memoizedState;
            var nextChildren = nextState.element;

            reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
            return workInProgress.child;
        }

    }
    //↓↓↓↓↓↓--------workInProgress.tag为fiber根组件---------↓↓↓↓↓↓




    //↓↓↓↓↓↓--------workInProgress.tag为客户端元素---------↓↓↓↓↓↓
    {

    }
    //↓↓↓↓↓↓--------workInProgress.tag为客户端元素---------↓↓↓↓↓↓




    //↓↓↓↓↓↓--------workInProgress.tag为class组件---------↓↓↓↓↓↓
    {

    }
    //↓↓↓↓↓↓--------workInProgress.tag为class组件---------↓↓↓↓↓↓





    //↓↓↓↓↓↓--------workInProgress.tag为文本---------↓↓↓↓↓↓
    {

    }
    //↓↓↓↓↓↓--------workInProgress.tag为文本---------↓↓↓↓↓↓



    function beginWork(current, workInProgress) {
        let renderExpirationTime = 0;
        //console.log("workInProgress.tag---", workInProgress.tag)
        switch (workInProgress.tag) {
            case ClassComponent: //1
                var _Component2 = workInProgress.type;
                var _unresolvedProps = workInProgress.pendingProps;
                var _resolvedProps = workInProgress.elementType === _Component2 ? _unresolvedProps : resolveDefaultProps(_Component2, _unresolvedProps);
                return updateClassComponent(current, workInProgress, _Component2, _resolvedProps, renderExpirationTime);
            case HostRoot: //3
                return updateHostRoot(current, workInProgress, renderExpirationTime);
            case HostComponent: //5
                // HostComponent = 5;
                return updateHostComponent(current, workInProgress, renderExpirationTime);
            case HostText: //6
                return updateHostText(current, workInProgress);
        }

    }

}
//↑↑↑↑↑↑--------beginWork---------↑↑↑↑↑↑



//↓↓↓↓↓↓--------分析用户的代码结构，完成fiber树的构建---------↓↓↓↓↓↓
{
    //执行每一个workInProgress携带的工作
    function performUnitOfWork(unitOfWork) {
        var current = unitOfWork.alternate;
        var next;
        next = beginWork(current, unitOfWork);
        unitOfWork.memoizedProps = unitOfWork.pendingProps;

        if (next === null) {
            next = completeUnitOfWork(unitOfWork);
        }
        return next
    }

    //workInProgress存在值，即存在工作，那么就一直执行工作performUnitOfWork(workInProgress)
    //直到workInProgress携带的工作做完
    function workLoopSync() {
        let a = 0
        while (workInProgress !== null) {

            workInProgress = performUnitOfWork(workInProgress);
        }
    }

}
//↑↑↑↑↑↑--------分析用户的代码结构，完成fiber树的构建---------↑↑↑↑↑↑


//↓↓↓↓↓↓--------workInProgress的初始化---------↓↓↓↓↓↓
{
    //根据root.curren创建workInProgress
    //root.curren就是fiber树的根节点，fiberRoot.current
    function prepareFreshStack(root, expirationTime) {
        root.finishedWork = null;
        root.finishedExpirationTime = NoWork;
        //workInProgressRoot = root;
        //workInProgress是全局变量
        workInProgress = createWorkInProgress(root.current, null);
    }

    //根据传递的current，即一个fiber结构，创建workInProgres对象。workInProgress对象是对该fiber结构的改造和扩展
    //如果，依赖的fiber对象的alternate没有值，就创建一个fiber,并赋值
    //如果，依赖的fiber对象的alternate有值，workInProgress = current.alternate

    //workInProgress就是一个fiber节点，它的effectTag、nextEffect、firstEffect、lastEffect等关于前后节点的操作等一开始都为空。
    //但是workInProgress会共享它创建所依赖的current节点的状态，如tag，elementType，type，stateNode，child，updateQueue....等状态
    //workInProgress依赖current创建，所以workInProgress的过去版本就是current
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
        debugger
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