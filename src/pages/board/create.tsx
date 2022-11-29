import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Button, Flex, Group, Text, TextInput } from '@mantine/core';
import { useAppSelector } from '../../hooks';
import { selectAuthenticationLogin } from '../../features/AuthenticationForm/AuthenticationLoginSlice';
import { useState } from 'react';
import { Create } from '../api/BoardService';

export default function CreatePost() {
  const authenticationLogin = useAppSelector(selectAuthenticationLogin)
  const [titleName, setTitleName] = useState(''); 
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
  });
  
  function handleSubmit() {
    console.log("submit..");

    Create(`/board/create`, {
      "title": titleName,
      "content": editor?.getHTML(),
      "writer": authenticationLogin.userId
    });
  }

  function test() {
    console.log("content html", editor?.getHTML());
    console.log("content json", editor?.getJSON());
    console.log("content text", editor?.getText());
  }

  return (
    <>
    <Flex gap="md"
          justify="flex-start"
          align="flex-start"
          direction="column"
    >
      <Text>
        ...
      </Text>
      <Group>
        <TextInput value={titleName} onChange={(event) => setTitleName(event.currentTarget.value)}></TextInput>
        <Text>Writer {authenticationLogin.userId}</Text>
      </Group>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      <Button onClick={handleSubmit}
      >
        Submit
      </Button>
      <Button onClick={test}>
        Test
      </Button>
    </Flex>
    </>
  ) 
}