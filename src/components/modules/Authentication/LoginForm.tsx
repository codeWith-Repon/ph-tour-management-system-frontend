import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Password from '@/components/ui/Password';
import { useLoginMutation } from '@/redux/features/auth/auth.api';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { error: 'Password is too short' }),
});

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [Login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    console.log(data);
    try {
      const result = await Login(userInfo).unwrap();
      toast.success(result.message);
      console.log('Login successful:', result);
    } catch (error) {
      console.error('Login error:', error);
      if (error.status === 401) {
        toast.error('Invalid email or password');
        navigate('/verify', { state: data.email });
      }
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Login your account</h1>
        <p className='text-sm text-muted-foreground'>
          Enter your Email below to login to your account
        </p>
      </div>

      <div className='grid gap-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='jhon.doe@example.com'
                      type='email'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className='sr-only'>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className='sr-only'>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </form>
        </Form>

        <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
          <span className='relative z-10 bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
        <Button
          type='button'
          variant='outline'
          className='w-full cursor-pointer'
        >
          Login with Google
        </Button>
      </div>

      <div className='text-center text-sm'>
        Don't have an account?{' '}
        <Link to='/register' className='underline underline-offset-4'>
          register
        </Link>
      </div>
    </div>
  );
}
