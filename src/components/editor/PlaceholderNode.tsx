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

  const text = node.textContent;
  const isFilled = text.length > 0 && text !== fieldId;
  const isSignature = fieldId && fieldId.toLowerCase().includes('signature');

  if (isSignature) {
    return (
      <NodeViewWrapper
        as="span"
        className={`mx-1 inline-block min-w-[200px] cursor-text text-center text-[15px] transition-colors border-b caret-gray-900 ${
          isFilled
            ? 'border-gray-800 text-gray-900 font-medium'
            : 'border-gray-400 text-gray-400/70 italic'
        }`}
        style={{ paddingBottom: '2px', verticalAlign: 'baseline' }}
      >
        <NodeViewContent as="span" className="outline-none" />
      </NodeViewWrapper>
    );
  }

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
