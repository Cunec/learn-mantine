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
import { useState } from 'react';
import { Signin } from '../../pages/api/AuthenticationService';

export interface AuthenticationFormProps {
  noShadow?: boolean;
  //noPadding?: boolean;
  //noSubmit?: boolean;
  //style?: React.CSSProperties;
  formtype: string;
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

  function handleSubmit() {
    console.log(form.values.email);

    Signin(`/auth/signin`, { 
          "username" : "abc", /// username backend에서 제거 할 것.
          "email" : form.values.email,
          "password" : form.values.password 
    });
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



// import { useToggle, upperFirst } from '@mantine/hooks';
// import { useForm } from '@mantine/form';
// import {
//   TextInput,
//   PasswordInput,
//   Text,
//   Paper,
//   Group,
//   PaperProps,
//   Button,
//   Divider,
//   Checkbox,
//   Anchor,
//   Stack,
// } from '@mantine/core';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';

// export function AuthenticationForm(props: PaperProps) {
//   const [type, toggle] = useToggle(['login', 'register']);
//   const form = useForm({
//     initialValues: {
//       email: '',
//       name: '',
//       password: '',
//       terms: true,
//     },

//     validate: {
//       email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
//       password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
//     },
//   });

//   return (
//     <Paper radius="md" p="xl" withBorder {...props}>
//       <Text size="lg" weight={500}>
//         Welcome to Mantine, {type} with
//       </Text>

//       <Group grow mb="md" mt="md">
//         <GoogleButton radius="xl">Google</GoogleButton>
//         <TwitterButton radius="xl">Twitter</TwitterButton>
//       </Group>

//       <Divider label="Or continue with email" labelPosition="center" my="lg" />

//       <form onSubmit={form.onSubmit(() => {})}>
//         <Stack>
//           {type === 'register' && (
//             <TextInput
//               label="Name"
//               placeholder="Your name"
//               value={form.values.name}
//               onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
//             />
//           )}

//           <TextInput
//             required
//             label="Email"
//             placeholder="hello@mantine.dev"
//             value={form.values.email}
//             onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
//             error={form.errors.email && 'Invalid email'}
//           />

//           <PasswordInput
//             required
//             label="Password"
//             placeholder="Your password"
//             value={form.values.password}
//             onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
//             error={form.errors.password && 'Password should include at least 6 characters'}
//           />

//           {type === 'register' && (
//             <Checkbox
//               label="I accept terms and conditions"
//               checked={form.values.terms}
//               onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
//             />
//           )}
//         </Stack>

//         <Group position="apart" mt="xl">
//           <Anchor
//             component="button"
//             type="button"
//             color="dimmed"
//             onClick={() => toggle()}
//             size="xs"
//           >
//             {type === 'register'
//               ? 'Already have an account? Login'
//               : "Don't have an account? Register"}
//           </Anchor>
//           <Button type="submit">{upperFirst(type)}</Button>
//         </Group>
//       </form>
//     </Paper>
//   );
// }



// import React, { useState } from 'react';
// import { useForm } from '@mantine/form';
// import { IconLock, IconAt } from '@tabler/icons';
// import {
//   TextInput,
//   PasswordInput,
//   Group,
//   Checkbox,
//   Button,
//   Paper,
//   Text,
//   LoadingOverlay,
//   Anchor,
//   useMantineTheme,
// } from '@mantine/core';

// export interface AuthenticationFormProps {
//   // noShadow?: boolean;
//   noPadding?: boolean;
//   noSubmit?: boolean;
//   style?: React.CSSProperties;
// }

// export function AuthenticationForm({
//   // noShadow,
//   noPadding,
//   noSubmit,
//   style,
// }: AuthenticationFormProps) {
//   const [formType, setFormType] = useState<'register' | 'login'>('register');
//   const [loading, setLoading] = useState(false);
//   // const [error, setError] = useState<string>(null);
//   const theme = useMantineTheme();

//   const toggleFormType = () => {
//     setFormType((current) => (current === 'register' ? 'login' : 'register'));
//     // setError(null);
//   };

//   const form = useForm({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       termsOfService: true,
//     },
//   });

//   const handleSubmit = () => {
//     setLoading(true);
//     // setError(null);
//     setTimeout(() => {
//       setLoading(false);
//       // setError(
//       //   formType === 'register'
//       //     ? 'User with this email already exists'
//       //     : 'User with this email does not exist'
//       // );
//     }, 3000);
//   };

//   return (
//     <Paper
//       p={noPadding ? 0 : 'lg'}
//       // shadow={noShadow ? null : 'sm'}
//       style={{
//         position: 'relative',
//         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
//         ...style,
//       }}
//     >
//       <form onSubmit={form.onSubmit(handleSubmit)}>
//         <LoadingOverlay visible={loading} />
//         {formType === 'register' && (
//           <Group grow>
//             <TextInput
//               data-autofocus
//               required
//               placeholder="Your first name"
//               label="First name"
//               {...form.getInputProps('firstName')}
//             />

//             <TextInput
//               required
//               placeholder="Your last name"
//               label="Last name"
//               {...form.getInputProps('lastName')}
//             />
//           </Group>
//         )}

//         <TextInput
//           mt="md"
//           required
//           placeholder="Your email"
//           label="Email"
//           icon={<IconAt size={16} stroke={1.5} />}
//           {...form.getInputProps('email')}
//         />

//         <PasswordInput
//           mt="md"
//           required
//           placeholder="Password"
//           label="Password"
//           icon={<IconLock size={16} stroke={1.5} />}
//           {...form.getInputProps('password')}
//         />

//         {formType === 'register' && (
//           <PasswordInput
//             mt="md"
//             required
//             label="Confirm Password"
//             placeholder="Confirm password"
//             icon={<IconLock size={16} stroke={1.5} />}
//             {...form.getInputProps('confirmPassword')}
//           />
//         )}

//         {formType === 'register' && (
//           <Checkbox
//             mt="xl"
//             label="I agree to sell my soul and privacy to this corporation"
//             {...form.getInputProps('termsOfService', { type: 'checkbox' })}
//           />
//         )}

//         {/* {error && (
//           <Text color="red" size="sm" mt="sm">
//             {error}
//           </Text>
//         )} */}

//         {!noSubmit && (
//           <Group position="apart" mt="xl">
//             <Anchor
//               component="button"
//               type="button"
//               color="dimmed"
//               onClick={toggleFormType}
//               size="sm"
//             >
//               {formType === 'register'
//                 ? 'Have an account? Login'
//                 : "Don't have an account? Register"}
//             </Anchor>

//             <Button color="blue" type="submit">
//               {formType === 'register' ? 'Register' : 'Login'}
//             </Button>
//           </Group>
//         )}
//       </form>
//     </Paper>
//   );
// }