import React from "react";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

export default function DisplayEditorContent(props) {
  const content = convertFromRaw(props.value);
  const sdsd = EditorState.createWithContent(content);
  return (
    <div>
      <div>
        <Editor toolbarHidden={true} editorState={sdsd} readOnly={true} />
      </div>
    </div>
  );
}
