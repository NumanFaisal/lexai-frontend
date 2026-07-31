import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react';

export const PlaceholderNode = Node.create({
  name: 'templatePlaceholder',
  group: 'inline',
  inline: true,
  content: 'text*',
  selectable: true,
  atom: false,

  addAttributes() {
    return {
      fieldId: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute('fieldid') ||
          element.getAttribute('fieldId') ||
          element.getAttribute('data-field-id') ||
          element.textContent?.trim(),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="template-placeholder"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { 'data-type': 'template-placeholder' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(PlaceholderComponent);
  },
});

function PlaceholderComponent(props: any) {
  const { node } = props;
  const { fieldId } = node.attrs;

  const text = node.textContent || '';
  const effectiveFieldId = fieldId || text || '';
  const isFilled = text.length > 0 && text !== effectiveFieldId;

  return (
    <NodeViewWrapper
      as="span"
      className={`mx-0.5 inline-flex cursor-text items-center rounded border px-1.5 py-0 text-[13px] font-medium transition-colors ${
        isFilled
          ? 'border-green-200 bg-green-50 text-green-700'
          : 'border-orange-200 bg-orange-50 text-orange-700'
      }`}
    >
      <NodeViewContent as="span" />
    </NodeViewWrapper>
  );
}
