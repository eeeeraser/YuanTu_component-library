# UI 设计规范约束 (Design System Rules)

## 1. 样式基准

- 项目使用我提供的 JSON 文件作为 Design Tokens。
- **严禁**在 CSS 或组件中使用硬编码（Hex/RGB/Static Pixel），必须引用变量。
- 间距、圆角、阴影必须严格遵循 Tokens 中的定义。

## 2. 交互偏好

- 所有的 Hover、Active、Disabled 状态必须有明确的视觉反馈（基于 Tokens 中的透明度或色阶）。
- 动效过渡（Transition）统一使用 200ms ease-in-out。

## 3. 开发规范

- 变量优先：禁止在代码中使用任何硬编码色值（如 #5343FD）或像素值（如 16px）。
- 语义优先：编写组件样式时，必须优先从 semantic.css 中选择变量。
- 报错机制：如果 AI 发现某个设计需求在 semantic.css 中找不到对应变量（例如需要一个卡片背景色但没有定义），要求它提醒你，而不是自己编造一个颜色。
