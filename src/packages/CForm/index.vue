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
                    <template v-if="item.type === 'radio'">
                        <el-radio-group
                                v-model="formItem[item.prop]"
                                :style="formContentWidth"
                                :disabled="item.disabled"
                                @input="radioChange"
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
                    <template v-if="item.type === 'checkbox'">
                        <el-checkbox-group
                                v-model="formItem[item.prop]"
                                :style="formContentWidth"
                                :disabled="item.disabled"
                                @change="checkBoxChange"
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
                            v-if="!item.type || item.type === 'text' || item.type === 'textarea'"
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
                                @input="inputInput"
                                @change="changeInput"
                                @blur="blurInput"
                                @focus="focusInput"
                        >
                            <template slot="prefix">
                                <slot name="prefix"></slot>
                            </template>
                            <template slot="suffix">
                                <slot name="suffix"></slot>
                            </template>
                            <template slot="prepend">
                                <slot name="prepend"></slot>
                            </template>
                            <template slot="append">
                                <slot name="append"></slot>
                            </template>
                        </el-input>
                    </template>
                    <template v-if="item.type === 'number'">
                        <el-input-number
                                v-model="formItem[item.prop]"
                                :style="formContentWidth"
                                :min="item.min"
                                :max="item.max"
                                :step="item.step"
                                :step-strictly="item.stepStrictly"
                                :precision="item.precision"
                                :disabled="item.disabled"
                                :controls="item.controls"
                                :controls-position="item.controlsPosition"
                                :placeholder="item.placeholder"
                                @change="changeNumber"
                                @blur="blurNumber"
                                @focus="focusNumber"
                        ></el-input-number>
                    </template>
                    <template v-if="item.type === 'select'">
                        <el-select
                                v-model="formItem[item.prop]"
                                :style="formContentWidth"
                                :disabled="item.disabled"
                                :multiple="item.multiple"
                                :multiple-limit="item.multipleLimit"
                                :filterable="item.filterable"
                                :placeholder="item.placeholder"
                                :clearable="item.clearable"
                                :collapse-tags="item.collapseTags"
                                :remote="item.remote"
                                :allow-create="item.allowCreate"
                                :loading="item.loading"
                                @filter-method="filerMethodSelect"
                                @remote-method="remoteMethodSelect"
                                @change="changeSelect"
                                @remove-tag="removeTagSelect"
                                @clear="clearSelect"
                                @blur="blurSelect"
                                @focus="focusSelect"
                                @visible-change="visibleChangeSelect"
                        >
                            <el-option
                                    v-for="(m,n) in item.options"
                                    :key="n"
                                    :label="m.label"
                                    :value="m.value"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template v-if="item.type === 'cascader'">
                        <el-cascader
                                v-model="formItem[item.prop]"
                                :style="formContentWidth"
                                :disabled="item.disabled"
                                :options="item.options"
                                :props="item.props"
                                :placeholder="item.placeholder"
                                :clearable="item.clearable"
                                :show-all-levels="item.showAllLevels"
                                :collapse-tags="item.collapseTags"
                                :separator="item.separator"
                                :filterable="item.filterable"
                                @change="changeCascader"
                                @expand-change="expandChangeCascader"
                                @blur="blurCascader"
                                @focus="focusCascader"
                                @visible-change="visibleChangeCascable"
                                @remove-tags="removeTagSelectsCascable"
                        >

                        </el-cascader>
                    </template>
                    <template v-if="item.type === 'switch'">
                        <el-switch
                                v-model="formItem[item.prop]"
                                :disabled="item.disabled"
                                :width="item.width"
                                :active-icon-class="item.activeIconClass"
                                :inactive-icon-class="item.inactiveIconClass"
                                :active-text="item.activeText"
                                :inactive-text="item.inactiveText"
                                :active-color="item.activeColor"
                                :inactive-color="item.inActiveColor"
                                :active-value="item.activeValue"
                                :inactive-value="item.inActiveValue"
                                :validate-event="item.validateEvent"
                                @change="changeSwitch"
                                @focus="focusSwitch"

                        >
                        </el-switch>
                    </template>
                    <template v-if="item.type === 'slider'">
                        <el-slider
                                v-model="formItem[item.prop]"
                                :disabled="item.disabled"
                                :min="item.min"
                                :max="item.max"
                                :step="item.step"
                                :input-size="item.inputSize"
                                :show-input="item.showInput"
                                :show-input-controls="item.showInputControls"
                                :show-stops="item.showStops"
                                :show-tooltip="item.showToolTip"
                                :range="item.range"
                                :vertical="item.vertical"
                                :height="item.height"
                                :label="item.label"
                                :marks="item.marks"
                                :debounce="item.debounce"
                                :tooltip-class="item.toolTipClass"
                                :format-tooltip="formatTooltipSlider"
                                @change="changeSlider"
                                @input="inputSlider"
                        >
                        </el-slider>
                    </template>
                    <template v-if="item.type === 'timePicker'||item.type === 'timeSelect'">
                        <el-time-picker
                                v-model="formItem[item.prop]"
                                :readonly="item.readonly"
                                :disabled="item.disabled"
                                :editable="item.editable"
                                :clearable="item.clearable"
                                :placeholder="item.placeholder"
                                :start-placeholder="item.startPlaceholder"
                                :end-placeholder="item.endPlaceholder"
                                :is-range="item.isRange"
                                :allow-control="item.allowControl"
                                :align="item.align"
                                :popper-class="item.popperClass"
                                :picker-options="item.pickerOptions"
                                :range-separator="item.rangeSeparator"
                                :value-format="item.valueFormat"
                                :default-value="item.defaultValue"
                                :name="item.nativeName"
                                :prefix-icon="item.prefixIcon"
                                :clear-icon="item.clearIcon"
                                @change="timePickerChange"
                                @blur="timePickerBlur"
                                @focus="timePickerFocus"
                        >
                        </el-time-picker>
                    </template>
                    <template v-if="item.type === 'datePicker'">
                        <el-date-picker
                                v-model="formItem[item.prop]"
                                :readonly="item.readonly"
                                :disabled="item.disabled"
                                :editable="item.editable"
                                :clearable="item.clearable"
                                :placeholder="item.placeholder"
                                :start-placeholder="item.startPlaceholder"
                                :end-placeholder="item.endPlaceholder"
                                :align="item.align"
                                :type="item.datePickerType"
                                :format="item.format"
                                :popper-class="item.popperClass"
                                :picker-options="item.pickerOptions"
                                :range-separator="item.rangeSeparator"
                                :value-format="item.valueFormat"
                                :default-value="item.defaultValue"
                                :default-time="item.defaultTime"
                                :name="item.nativeName"
                                :unlink-panels="item.unlinkPanels"
                                :prefix-icon="item.prefixIcon"
                                :clear-icon="item.clearIcon"
                                :validate-event="item.validateEvent"
                                :append-to-body="item.appendToBody"
                                @change="datePickerChange"
                                @blur="datePickerBlur"
                                @focus="datePickerFocus"
                        >
                        </el-date-picker>
                    </template>
                    <template v-if="item.type === 'dateTimePicker'">
                        <el-date-picker
                                v-model="formItem[item.prop]"
                                :readonly="item.readonly"
                                :disabled="item.disabled"
                                :editable="item.editable"
                                :clearable="item.clearable"
                                :placeholder="item.placeholder"
                                :start-placeholder="item.startPlaceholder"
                                :end-placeholder="item.endPlaceholder"
                                :align="item.align"
                                :type="item.dateTimePickerType"
                                :time-arrow-control="item.timeArrowControl"
                                :format="item.format"
                                :popper-class="item.popperClass"
                                :picker-options="item.pickerOptions"
                                :range-separator="item.rangeSeparator"
                                :value-format="item.valueFormat"
                                :default-value="item.defaultValue"
                                :default-time="item.defaultTime"
                                :name="item.nativeName"
                                :unlink-panels="item.unlinkPanels"
                                :prefix-icon="item.prefixIcon"
                                :clear-icon="item.clearIcon"
                                @change="dateTimePickerChange"
                                @blur="dateTimePickerBlur"
                                @focus="dateTimePickerFocus"
                        >
                            <template slot="range-separator">
                                <slot name="rangeSeparator"></slot>
                            </template>
                        </el-date-picker>
                    </template>
                    <template v-if="item.type === 'upload'">
                        <el-upload
                                :action="item.action"
                                :headers="item.headers"
                                :multiple="item.multiple"
                                :data="item.data"
                                :name="item.uploadName"
                                :with-credentials="item.withCredentials"
                                :show-file-list="item.showFileList"
                                :drag="item.drag"
                                :accept="item.accept"
                                :list-type="item.listType"
                                :auto-upload="item.autoUpload"
                                :file-list="item.fileList"
                                :disabled="item.disabled"
                                :limit="item.limit"
                                :on-preview="onPreviewUpload"
                                :on-remove="onRemoveUpload"
                                :on-success="onSuccessUpload"
                                :on-error="onErrorUpload"
                                :on-progress="onProgressUpload"
                                :on-change="onChangeUpload"
                                :before-upload="beforeUpload"
                                :before-remove="beforeRemoveUpload"
                                :http-request="httpRequestUpload"
                                :on-exceed="onExceedUpload"
                                @clearFiles="clearFilesUpload"
                                @abort="abortUpload"
                                @submit="submitUpload"
                        >
                            <template slot="trigger">
                                <slot name="trigger"></slot>
                            </template>
                            <template>
                                <slot name="upload"></slot>
                            </template>
                            <template slot="tip">
                                <slot name="tip"></slot>
                            </template>
                        </el-upload>
                    </template>
                </template>
            </template>
        </el-form-item>
        <el-form-item>
            <el-button
                    type="primary"
                    icon="el-icon-plus"
                    @click="onSubmit(formOption.ref)"
            >提 交
            </el-button
            >
            <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="onReset(formOption.ref)"
            >清 空
            </el-button
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
                number: 0,
                select: 1,
                cascder: [],
                switch: false,
                slider: 50,
                timePicker: '',
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
                    {
                        prop: "number",
                        name: "number",
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
                        type: "number",

                        disabled: false, //禁用
                        placeholder: "请输入数字", //占位提示
                        precision: 0, //精度
                        max: 100, //内容最大值
                        min: 0, //内容最小值
                        step: 2, //间隔
                        stepStrictly: false, //是否输入跳步
                        controls: true, //控制按钮
                        controlsPosition: "right", //按钮位置
                    },
                    {
                        prop: "select",
                        name: "select",
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
                        type: "select",

                        disabled: false, //禁用
                        multiple: false,//多选
                        placeholder: "请输入数字", //占位提示
                        clearable: false,//清除
                        collapseTags: false,//文本形式展示
                        multipleLimit: 0,//多选限制个数
                        filterable: false,//过滤
                        allowCreate: false,//允许创建
                        remote: false,//远程搜索
                        loading: false,//远程搜索中
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
                        prop: "cascader",
                        name: "cascader",
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
                        type: "cascader",
                        placeholder: '请选择',//占位符

                        clearable: false,//清空
                        showAllLevels: true,//显示完整路径
                        collapseTags: false,//折叠tag
                        separator: '/',//选项分隔符
                        filterable: false,//搜索

                        props: {
                            multiple: false,//多选
                            expandTrigger: 'click',//次级菜单展开方式
                            checkStrictly: false,//严格遵守父子节点不互相关联
                            emitPath: false,//返回数组或节点值
                            lazy: false,//动态加载子节点
                            lazyLoad: () => {
                                return 1
                            },//动态加载方法
                            value: 'value',//值属性值
                            label: 'label',//选项属性值
                            children: 'children',//子选项属性值
                            disabled: 'disabled',//禁用属性值
                            leaf: 'lear',//叶子节点属性值
                        },
                        options: [
                            {
                                value: 1,
                                label: '东南',
                                children: [{
                                    value: 2,
                                    label: '上海',
                                    children: [
                                        {value: 3, label: '普陀'},
                                        {value: 4, label: '黄埔'},
                                        {value: 5, label: '徐汇'}
                                    ]
                                }, {
                                    value: 7,
                                    label: '江苏',
                                    children: [
                                        {value: 8, label: '南京'},
                                        {value: 9, label: '苏州'},
                                        {value: 10, label: '无锡'}
                                    ]
                                }, {
                                    value: 12,
                                    label: '浙江',
                                    children: [
                                        {value: 13, label: '杭州'},
                                        {value: 14, label: '宁波'},
                                        {value: 15, label: '嘉兴'}
                                    ]
                                }]
                            }, {
                                value: 17,
                                label: '西北',
                                children: [{
                                    value: 18,
                                    label: '陕西',
                                    children: [
                                        {value: 19, label: '西安'},
                                        {value: 20, label: '延安'}
                                    ]
                                }, {
                                    value: 21,
                                    label: '新疆维吾尔族自治区',
                                    children: [
                                        {value: 22, label: '乌鲁木齐'},
                                        {value: 23, label: '克拉玛依'}
                                    ]
                                }]
                            }]

                    },
                    {
                        prop: "switch",
                        name: "switch",
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
                        type: "switch",

                        width: 40,//像素宽度
                        disabled: false,//是否禁用
                        activeIconClass: '',//打开图标类名
                        inactiveIconClass: '',//关闭图标类名
                        activeText: '',//打开文字描述
                        inactiveText: '',//关闭文字描述
                        activeValue: true,//打开时候的值
                        inActiveValue: false,//关闭时候的值
                        activeColor: '#409EFF',//打开时候的背景色
                        inActiveColor: '#C0CCDA',//关闭时候的背景色
                        validateEvent: true,//状态改变触发校验
                    },
                    {
                        prop: "slider",
                        name: "slider",
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
                        type: "slider",
                        disabled: false,
                        min: 0,
                        max: 100,
                        step: 1,
                        showInput: false,
                        showInputControls: true,
                        inputSize: 'small',
                        showStops: false,
                        showToolTip: true,
                        range: false,
                        vertical: false,
                        height: '',
                        label: '',
                        marks: {},
                        toolTipClass: '',
                        debounce: 300
                    },
                    {
                        prop: 'timePicker',
                        name: "timePicker",
                        rules: [
                            //校验规则
                            {
                                required: true,
                                message: "请选择时间", //校验提示
                                trigger: "blur",
                            },
                        ],
                        size: "", //单独组件大小
                        labelWidth: "", //单独label宽度
                        slot: false, //是否插槽。slot-name:prop
                        type: "timePicker",
                        disabled: false,
                        readonly: false,
                        editable: true,
                        clearable: true,
                        placeholder: '请选择时间',
                        startPlaceholder: '请选择开始时间',
                        endPlaceholder: '请选择结束时间',
                        idRange: false,
                        allowControl: false,
                        align: 'left',
                        popperClass: '',
                        pickerOptions: {},
                        rangeSeparator: '-',
                        valueFormat: '',
                        defaultValue: '',
                        nativeName: '',
                        prefixIcon: 'el-icon-time',
                        clearIcon: 'el-icon-circle-close'

                    },
                    {
                        prop: 'datePicker',
                        name: "datePicker",
                        rules: [
                            //校验规则
                            {
                                required: true,
                                message: "请选择时间", //校验提示
                                trigger: "blur",
                            },
                        ],
                        size: "", //单独组件大小
                        labelWidth: "", //单独label宽度
                        slot: false, //是否插槽。slot-name:prop
                        type: "datePicker",

                        disabled: false,
                        readonly: false,
                        editable: true,
                        clearable: true,
                        placeholder: '请选择时间',
                        startPlaceholder: '请选择开始时间',
                        endPlaceholder: '请选择结束时间',
                        datePickerType: 'date',
                        align: 'left',
                        popperClass: '',
                        pickerOptions: {},
                        rangeSeparator: '-',
                        format: '',
                        defaultValue: null,
                        defaultTime: '',
                        valueFormat: '',
                        nativeName: '',
                        unlinkPanels: false,
                        prefixIcon: 'el-icon-time',
                        clearIcon: 'el-icon-circle-close',
                        validateEvent: true,
                        appendToBody: true,

                    },
                    {
                        prop: 'dateTimePicker',
                        name: "dateTimePicker",
                        rules: [
                            //校验规则
                            {
                                required: true,
                                message: "请选择时间", //校验提示
                                trigger: "blur",
                            },
                        ],
                        size: "", //单独组件大小
                        labelWidth: "", //单独label宽度
                        slot: false, //是否插槽。slot-name:prop
                        type: "dateTimePicker",

                        disabled: false,
                        readonly: false,
                        editable: true,
                        clearable: true,
                        placeholder: '请选择时间',
                        startPlaceholder: '请选择开始时间',
                        endPlaceholder: '请选择结束时间',
                        timeArrowControl: false,
                        dateTimePickerType: 'date',
                        align: 'left',
                        popperClass: '',
                        pickerOptions: {},
                        rangeSeparator: '-',
                        format: '',
                        defaultValue: null,
                        defaultTime: '',
                        valueFormat: '',
                        nativeName: '',
                        unlinkPanels: false,
                        prefixIcon: 'el-icon-time',
                        clearIcon: 'el-icon-circle-close',
                    },
                    {
                        prop: 'upload',
                        name: "upload",
                        rules: [
                            //校验规则
                            {
                                required: true,
                                message: "请选择时间", //校验提示
                                trigger: "blur",
                            },
                        ],
                        size: "", //单独组件大小
                        labelWidth: "", //单独label宽度
                        slot: false, //是否插槽。slot-name:prop
                        type: "upload",

                        disabled: false,
                        action: '',
                        headers: {},
                        multiple: false,
                        data: {},
                        uploadName: 'file',
                        withCredentials: false,
                        showFileList: true,
                        drag: false,
                        accept: '',
                        listType: null,
                        autoUpload: true,
                        fileList: [],
                        limit: 1,
                    }
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
        radioChange(val) {
            console.log(val);
        },
        checkBoxChange(val) {
            console.log(val);
        },
        inputInput(val) {
            console.log(val);
        },
        changeInput(val) {
            console.log(val);
        },
        blurInput() {
        },
        focusInput() {
        },
        changeNumber(val) {
            console.log(val);
        },
        blurNumber() {
        },
        focusNumber() {
        },
        filerMethodSelect() {
        },
        remoteMethodSelect() {
        },
        clearSelect() {
        },
        changeSelect() {
        },
        removeTagSelect() {
        },
        blurSelect() {
        },
        focusSelect() {
        },
        visibleChangeSelect() {
        },
        changeCascader() {
        },
        expandChangeCascader() {
        },
        blurCascader() {
        },
        focusCascader() {
        },
        visibleChangeCascable() {
        },
        removeTagSelectsCascable() {
        },
        changeSwitch() {
        },
        focusSwitch() {
        },
        formatTooltipSlider() {
        },
        changeSlider() {
        },
        inputSlider() {
        },
        timePickerChange() {
        },
        timePickerBlur() {
        },
        timePickerFocus() {
        },
        datePickerChange() {
        },
        datePickerBlur() {
        },
        datePickerFocus() {
        },
        dateTimePickerChange() {
        },
        dateTimePickerBlur() {
        },
        dateTimePickerFocus() {
        },
        onPreviewUpload() {
        },
        onRemoveUpload() {
        },
        onSuccessUpload() {
        },
        onErrorUpload() {
        },
        onProgressUpload() {
        },
        onChangeUpload() {
        },
        beforeUpload() {
        },
        beforeRemoveUpload() {
        },
        httpRequestUpload() {
        },
        onExceedUpload() {
        },
        clearFilesUpload() {
        },
        abortUpload() {
        },
        submitUpload() {
        },
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