<template>
  <el-form
    :ref="formOption.ref"
    :model="formItem"
    :label-width="formOption.labelWidth"
    :style="formWidth"
    :label-position="formOption.labelPosition"
    :size="formOption.size"
    :disabled="formOption.disabled"
    @
  >
    <el-form-item
      v-for="(item, index) in formOption.columns"
      :key="index"
      :label="item.name"
      :label-width="item.labelWidth"
      :style="formItemWidth"
      :rules="item.rules"
      :prop="item.prop"
      :size="item.size"
    >
      <template>
        <slot v-if="item.slot" :name="item.prop"></slot>
        <template v-else>
          <template v-if="item.type == 'radio'">
            <el-radio-group
              v-model="formItem[item.prop]"
              :style="formContentWidth"
              :disabled="item.disabled"
            >
              <template v-if="item.isRadioButton">
                <el-radio-button
                  v-for="(m, n) in item.options"
                  :key="n"
                  :label="m.value"
                  :disabled="m.disabled"
                  >{{ m.label }}
                </el-radio-button>
              </template>
              <template v-else>
                <el-radio
                  v-for="(m, n) in item.options"
                  :key="n"
                  :label="m.value"
                  :disabled="m.disabled"
                  >{{ m.label }}
                </el-radio>
              </template>
            </el-radio-group>
          </template>
          <template v-if="item.type == 'checkbox'">
            <el-checkbox-group
              v-model="formItem[item.prop]"
              :style="formContentWidth"
              :disabled="item.disabled"
            >
              <template v-if="item.isCheckBoxButton">
                <el-checkbox-button
                  v-for="(m, n) in item.options"
                  :key="n"
                  :label="m.value"
                  :disabled="m.disabled"
                  >{{ m.label }}
                </el-checkbox-button>
              </template>
              <template v-else>
                <el-checkbox
                  v-for="(m, n) in item.options"
                  :key="n"
                  :label="m.value"
                  :disabled="m.disabled"
                  >{{ m.label }}
                </el-checkbox>
              </template>
            </el-checkbox-group>
          </template>
          <template
            v-if="!item.type || item.type == 'text' || item.type == 'textarea'"
          >
            <el-input
              v-model="formItem[item.prop]"
              :style="formContentWidth"
              :type="item.type"
              :disabled="item.disabled"
              :clearable="item.clearable"
              :maxlength="item.maxlength"
              :minlength="item.minLength"
              :show-word-limit="item.showWordLimit"
              :placeholder="item.placeholder"
              :show-password="item.showPassword"
              :rows="item.rows"
              :prefix-icon="item.prefixIcon"
              :suffix-icon="item.suffixIcon"
              :autosize="item.autosize"
              :readonly="item.readonly"
              :max="item.max"
              :min="item.min"
              :step="item.step"
            >
            </el-input>
          </template>
        </template>
      </template>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="onSubmit(formOption.ref)"
        >提 交</el-button
      >
      <el-button
        type="danger"
        icon="el-icon-delete"
        @click="onReset(formOption.ref)"
        >清 空</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CForm",
  // props: ['option'],//简写
  props: {
    //类型校验详细
    option: {
      labelWidth: "80px",
      columns: [
        {
          prop: "id",
          name: "ID",
          rule: {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        },
        {
          prop: "time",
          name: "ID",
          rule: {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        },
        {
          prop: "message",
          name: "ID",
          rule: {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        },
      ],
    }, //默认值
    form: {
      name: "",
    }, //默认值
    //option:[Object,...],//类型校验简写
  },
  data() {
    return {
      formItem: {
        checkbox: [1, 3],
        radio: 3,
        text: "",
      },
      formOption: {
        ref: "cform",
        formWidth: "50%", //表单整体宽度。作用于el-form
        formItemWidth: "100%", //表单item宽度。作用于el-form-item
        formContentWidth: "100%", //表单item内部宽度。作用于el-select组件等
        labelPosition: "right", //form-label位置
        labelWidth: "auto", //form-label宽度
        size: "", //表单组件大小
        disabled: false, //是否禁用。已经统一修改了样式，类同readonly
        columns: [
          {
            prop: "radio",
            name: "radio",
            rules: [
              //校验规则
              {
                required: true,
                message: "请输入活动名称",
                trigger: "blur",
              },
            ],
            size: "", //单独组件大小
            labelWidth: "", //单独label宽度
            slot: false, //是否插槽。slot-name:prop

            disabled: false, //禁用当前组件。已经统一修改了样式，类同readonly
            type: "radio", //组件类型类型
            isRadioButton: true, //是否按钮
            options: [
              //选择选项
              {
                label: "上海", //名称
                value: 1, //key值
                disabled: false, //禁用
              },
              {
                label: "北京",
                value: 2,
                disabled: true,
              },
              {
                label: "天津",
                value: 3,
                disabled: false,
              },
            ],
          },
          {
            prop: "checkbox",
            name: "checkbox",
            rules: [
              //校验规则
              {
                required: true,
                message: "请输入活动名称",
                trigger: "blur",
              },
            ],
            size: "", //单独组件大小
            labelWidth: "", //单独label宽度
            slot: false, //是否插槽。slot-name:prop

            disabled: false, //禁用当前组件。已经统一修改了样式，类同readonly
            type: "checkbox", //组件类型类型
            isCheckBoxButton: true, //是否按钮
            options: [
              //选择选项
              {
                label: "上海", //名称
                value: 1, //key值
                disabled: false, //禁用
              },
              {
                label: "北京",
                value: 2,
                disabled: true,
              },
              {
                label: "天津",
                value: 3,
                disabled: false,
              },
            ],
          },
          {
            prop: "text",
            name: "text",
            rules: [
              //校验规则
              {
                required: true,
                message: "请输入活动名称", //校验提示
                trigger: "blur",
              },
            ],
            size: "", //单独组件大小
            labelWidth: "", //单独label宽度
            slot: false, //是否插槽。slot-name:prop
            type: "text",
            disabled: false, //禁用
            clearable: true, //清空
            maxLength: 100, //字符最大长度
            minLength: 100, //字符最小长度
            placeholder: "请输入活动名称", //占位提示
            showPassword: true, //密码展示
            prefixIcon: "", //前位图片展示
            suffixIcon: "", //后位图片展示
            rows: 3, //固定行数
            autosize: {
              //自适应内容高度
              minRows: 2,
              maxRows: 6,
            },
            readonly: false, //只读
            max: 100, //内容最大值
            min: 0, //内容最小值
            step: 2, //间隔
          },
        ],
      },
    };
  },
  watch: {},
  computed: {
    formWidth() {
      return `width:${this.formOption.formWidth}`;
    },
    formItemWidth() {
      return `width:${this.formOption.formItemWidth}`;
    },
    formContentWidth() {
      return `width:${this.formOption.formContentWidth}`;
    },
    // formItem() {
    //   return this.form;
    // },
    // formOption() {
    //   return this.option;
    // },
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
      });
    },
    onReset(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.elFormItem {
  width: 50%;
}
</style>