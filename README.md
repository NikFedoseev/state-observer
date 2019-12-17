## Interface 
```
createStore (defaultState: Object) => {
	getState: () => Object;
	setState: (newState:  Object);
	connect: (mapStateToProps:  Object, func:  Function);	
}
```

## Examples 
1. Create default store state
```
const defaultState = {
	foo:  'bar', 
	fiz:  'buzz'
}
```
2. Create Store
```
const store = createStore(defaultState);
```
3.  Connect function which triggered by a change of the part of store
```
//part of store
const mapStateToProps =  (state)  =>  ({
	foo: state.foo
})

//triggered function
const func = ({foo})  =>  {
	console.log('triggered')
}

store.connect(mapStateToProps, func)
```
4. Change state
```
store.setState({foo:  'biba'})
```
5. Connected func triggered
```
expected output: 'triggered'
```
