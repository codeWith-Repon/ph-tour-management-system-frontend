import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dot } from 'lucide-react';
import { useSendOtpMutation } from '@/redux/features/auth/auth.api';
import { toast } from 'sonner';

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirm, setConfirm] = useState(false);
  const [sendOtp] = useSendOtpMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  const handleConfirm = async () => {
    try {
      const res = await sendOtp({ email }).unwrap();

      if (res.success) {
        toast.success('OTP Sent!');
      }

      setConfirm(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  // Needed - Turned of for development

  // useEffect(() => {
  //   if (!email) {
  //     navigate('/');
  //   }
  // }, [email]);

  return (
    <div className='grid place-content-center h-screen'>
      {confirm ? (
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>Verify your email address</CardTitle>
            <CardDescription>
              Please enter the 6-digit code sent to <br /> {email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id='otp-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='pin'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button form='otp-form' type='submit'>
              Verify
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>Verify your email address</CardTitle>
            <CardDescription>
              We will send you an OTP at <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardFooter className='flex justify-end'>
            <Button
              onClick={handleConfirm}
              className='w-[300px]'
              form='otp-form'
              type='submit'
            >
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Verify;
