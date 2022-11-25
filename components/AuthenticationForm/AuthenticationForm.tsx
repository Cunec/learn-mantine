import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { GoogleButton, TwitterButton } from '../../src/components/SocialButtons/SocialButtons';
import { useState } from 'react';
import { Signin, Signup } from '../../src/pages/api/AuthenticationService';
import React from 'react';

export interface AuthenticationFormProps {
  noShadow?: boolean;
  //noPadding?: boolean;
  //noSubmit?: boolean;
  //style?: React.CSSProperties;
  formtype: string;
  loginCallback: (loggedIn : boolean, userId : string) => void;
}

export function AuthenticationForm(props: AuthenticationFormProps) {
  // const [type, toggle] = useToggle(['login', 'register']);
  const [formType, setFormType] = useState<'register' | 'login'>(props.formtype === 'login' ? 'login' : 'register');
  const form = useForm({
    initialValues: {
      email: '',
      nickName: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const toggleFormType = () => {
    setFormType((current) => (current === 'register' ? 'login' : 'register'));
  };

  async function handleSubmit() {
    // console.log("handleSubmit.. formType:", formType, ", email:", form.values.email);

    if (formType === "login") {
      const signin = await Signin(`/auth/signin`, { 
        "email" : form.values.email,
        "password" : form.values.password 
      });
      console.log("signin ", signin);

      if (signin !== "Fail") {
        props.loginCallback(true, signin);
      }
    } else {
      const signup = await Signup(`/auth/signup`, {
        "username" : form.values.nickName,
        "email" : form.values.email,
        "password" : form.values.password 
      })
      console.log("signup ", signup);
      
      if (signup !== "") {
        /// 
      }
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Mantine, {formType} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {formType === 'register' && (
            <TextInput
              label="Nick name"
              placeholder="Your nick name"
              value={form.values.nickName}
              onChange={(event) => form.setFieldValue('nickName', event.currentTarget.value)}
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />

          {formType === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={toggleFormType}
            size="xs"
          >
            {formType === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(formType)}</Button>
        </Group>
      </form>
    </Paper>
  );
}