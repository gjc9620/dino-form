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
groups       | `Object`     |    Can be delete or add item(s)| [example](wwww)
subform       | `Object`     |    Nesting other dino-form       | [example](wwww)

### group
group      | Type    |     Describe | Example 
---        | ---     |    ---       | --- 
Com | `dino-form`       |   Will transform become group |  [example](wwww)
field | `String`       |    Fields will become object key when collect form    |  [example](wwww)
count | `Number`       |    init count       |  [example](wwww)
formProps | `Boolean`       |    Com's props |  [example](wwww)
needDrag | `Boolean`       |    turn off(on) drag &drop       |  [example](wwww)
clearMotions | `Boolean`       |    turn off(on) drag &drop       |  [example](wwww)
pressedMotions | `Boolean`       |    turn off(on) drag &drop       |  [example](wwww)
notPressedMotions | `Boolean`       |    turn off(on) drag &drop       |  [example](wwww)
createStyle | `Boolean`       |    turn off(on) drag &drop       |  [example](wwww)
#### CreateForm
```
  import createForm from 'dino-form';
  createForm(parts)(View)(Wrap)
```

#### Why?

#### What is Parts & View & Wrap?

### Drag && Drop
needDrag


