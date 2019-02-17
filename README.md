# Dino-form

## Todo 
  getValue



#### DinoForm
* FromItem
* setFieldsValue
* setFullValues
* setFieldsError
* getFullValues
* getFieldsValue
* verify
* store
* dinoFormRef


//todo editing...
### DinoForm
parts      | Type    |     Describe | Example 
---        | ---     |    ---       | --- 
fragments   | `Object`       |    fragments       |  [example](https://codesandbox.io/s/23rl65mnzr)
groups       | `Object`     |    Can be delete or add item(s)| [Detail](#group)
subform       | `Object`     |    Nesting other dino-form       | [example](https://codesandbox.io/s/23rl65mnzr)

### group
group      | Type    |     Describe | Example 
---        | ---     |    ---       | --- 
Com | `dino-form`       |   Will transform become group |  [example](https://codesandbox.io/s/23rl65mnzr)
field | `String`       |    Fields will become object key when collect form    |  [example](https://codesandbox.io/s/23rl65mnzr)
count | `Number`       |    init count       |  [example](https://codesandbox.io/s/23rl65mnzr)
formProps | `Boolean`       |    Com's props |  [example](https://codesandbox.io/s/23rl65mnzr)
needDrag | `Boolean`       |    turn off(on) drag & drop       |  [example](https://codesandbox.io/s/23rl65mnzr)
clearMotions | `Function`       |    reset all animation  |  [example](https://codesandbox.io/s/23rl65mnzr)
pressedMotions | `Function`       |  return Motion Object       |  [example](https://codesandbox.io/s/23rl65mnzr)
notPressedMotions | `Function`       |    return Motion Object        |  [example](https://codesandbox.io/s/23rl65mnzr)
createStyle | `Function`       |   Apply Motion    |  [example](https://codesandbox.io/s/23rl65mnzr)
#### CreateForm
```
  import createForm from 'dino-form';
  createForm(parts)(View)(Wrap)
```

#### Why?

#### What is Parts & View & Wrap?

### Drag && Drop
needDrag


