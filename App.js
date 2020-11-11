class App extends React.Component {
    getSnapshotBeforeUpdate(a) {
        console.log('--getSnapshotBeforeUpdate--', a)
    }

    render() {
        return React.createElement(
            "div", 
            {},
            React.createElement(
                "p", {},
                React.createElement("span", {
                    style: {
                        color: "red"
                    }
                }, "hello react"),
                React.createElement("span", {
                    style: {
                        color: "orange"
                    }
                }, "goog panf")
            ),
            React.createElement("span", {}, "made by panfeng"),
        )
    }
}
console.log(React.createElement("span", {}, "hello react"))

ReactDOM.render(
    React.createElement(App, {}),
    document.getElementById('root')
);