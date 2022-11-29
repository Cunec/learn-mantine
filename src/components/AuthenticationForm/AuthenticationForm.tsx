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
import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';
import { Signin, Signup } from '../../pages/api/AuthenticationService';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAuthenticationForm, setFormModal, setFormType } from '../../features/AuthenticationForm/AuthenticationFormSlice';

export function AuthenticationForm() {
  const authenticationForm = useAppSelector(selectAuthenticationForm)

  const dispatch = useAppDispatch()
  
  const router = useRouter();
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
    //setAuthenticationForm((current) => (current === 'register' ? 'login' : 'register'));
    setFormType('register');
  };

  async function handleSubmit() {
    if (authenticationForm.formType === "login") {
      const signin = await Signin(`/auth/signin`, { 
        "email" : form.values.email,
        "password" : form.values.password 
      })

      /// 정상적으로 로그인이 되었다면 모달 창을 닫아준다.
      if (signin !== "Fail") {
        //props.logincallback(true, signin);
        dispatch(setFormModal(false));
      }

    } else {
      await Signup(`/auth/signup`, {
        "username" : form.values.nickName,
        "email" : form.values.email,
        "password" : form.values.password 
      })
      .then((response) => {
        console.log(`Your signup is completed. Welcome ${response}`);

        router.push(`/`);
      })
      .catch((error) => {
        console.log(error);

        if (error.response.status === 400) {
          console.log(`HTTP 400 error occured`);
        }
      })
    }
  }


  return (
    <>
    <Paper radius="md" p="xl" withBorder {...authenticationForm}>
      <Text size="lg" weight={500}>
        Welcome to Mantine, {authenticationForm.formType} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <>
            {authenticationForm.formType === 'register' && (
              <TextInput
              label="Nick name"
              placeholder="Your nick name"
              value={form.values.nickName}
              onChange={(event) => form.setFieldValue('nickName', event.currentTarget.value)}
              />
            )}
          </>
          <>
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
          </>
          <>
            {authenticationForm.formType === 'register' && (
              <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </>
        </Stack>
        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={toggleFormType}
            size="xs"
          >
          <>
            {authenticationForm.formType === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </>
          </Anchor>
          <Button type="submit">{upperFirst(authenticationForm.formType)}</Button>
        </Group>
      </form>
    </Paper>
    </>
  );
}