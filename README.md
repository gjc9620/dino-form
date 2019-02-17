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
count | `Number`       |    Number of initializations       |  [example](https://codesandbox.io/s/23rl65mnzr)
formProps | `Boolean`       |    Com's props |  [example](https://codesandbox.io/s/23rl65mnzr)
needDrag | `Boolean`       |    Turn off(on) drag & drop       |  [example](https://codesandbox.io/s/23rl65mnzr)
clearMotions | `Function`       |    Reset all animation function  |  [example](https://codesandbox.io/s/23rl65mnzr)
pressedMotions | `Function`       |  Return Motion Object function       |  [example](https://codesandbox.io/s/23rl65mnzr)
notPressedMotions | `Function`       |    return Motion Object function        |  [example](https://codesandbox.io/s/23rl65mnzr)
createStyle | `Function`       |   Apply Motion function    |  [example](https://codesandbox.io/s/23rl65mnzr)
#### CreateForm
```
  import createForm from 'dino-form';
  createForm(parts)(View)(Wrap)
```

#### Why?

#### What is Parts & View & Wrap?

### Drag && Drop
needDrag


