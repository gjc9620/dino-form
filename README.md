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
fragments   | `Object`       |    fragments       |  [example](wwww)
groups       | `Object`     |    Can be delete or add item(s)| [Detail](#group)
subform       | `Object`     |    Nesting other dino-form       | [example](wwww)

### group
group      | Type    |     Describe | Example 
---        | ---     |    ---       | --- 
Com | `dino-form`       |   Will transform become group |  [example](wwww)
field | `String`       |    Fields will become object key when collect form    |  [example](wwww)
count | `Number`       |    init count       |  [example](wwww)
formProps | `Boolean`       |    Com's props |  [example](wwww)
needDrag | `Boolean`       |    turn off(on) drag &drop       |  [example](wwww)
clearMotions | `Function`       |    reset all animation  |  [example](wwww)
pressedMotions | `Function`       |  return Motion Object       |  [example](wwww)
notPressedMotions | `Function`       |    return Motion Object        |  [example](wwww)
createStyle | `Function`       |   Apply Motion    |  [example](wwww)
#### CreateForm
```
  import createForm from 'dino-form';
  createForm(parts)(View)(Wrap)
```

#### Why?

#### What is Parts & View & Wrap?

### Drag && Drop
needDrag


