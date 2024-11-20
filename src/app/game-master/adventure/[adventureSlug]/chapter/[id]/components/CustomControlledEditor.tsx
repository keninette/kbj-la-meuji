'use client';

import React, { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Session } from '@/model/sessions/Session.class';
import dynamic from 'next/dynamic';
// Dynamic import is necessary in order to avoid an import before page is loaded
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });

// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
// https://medium.com/@farmaan30327/implementing-wysiwyg-editor-in-nextjs-74f46556379f

type CustomEditorProps = {
  session?: Session;
  onContentStateCallback: (thisSession: Session) => void;
};
export function CustomControlledEditor({ session, onContentStateCallback }: CustomEditorProps) {
  const [editorState, setEditorState] = useState<EditorState>();
  const [convertedContent, setConvertedContent] = useState();

  const onEditorStateChange = (newEditorState: EditorState) => {
    if (JSON.stringify(editorState) === JSON.stringify(newEditorState)) {
      return;
    }

    setConvertedContent(convertToRaw(newEditorState.getCurrentContent()));
    setEditorState(newEditorState);
  };

  // Use effects
  useEffect(() => {
    if (session?.description) {
      setEditorState(EditorState.createWithContent(convertFromRaw(session.description)));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onContentStateCallback({ ...session, description: convertedContent } as Session);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [convertedContent]);

  // todo fix this
  return session ? (
    <Editor editorState={editorState} onEditorStateChange={onEditorStateChange} />
  ) : session ? (
    'Loading...'
  ) : (
    'Select a session'
  );
}
