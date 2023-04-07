import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IndividualAuthSchema } from '@/validationschema/authSchema'
import { IndividalMechant } from '@/interface/form.interface'
import Input from '../input/TextInput'
import Button from '../button/Button'
import { useTypedDispatch } from '@/redux/store'
import { openModal } from '@/redux/reducer/modalReducer'
import { useAdduserMutation } from '@/redux/services/auth.service'
import { AuthError } from '@/interface/error.interface'
import { toast } from 'react-toastify'

const MechantIndividualRegistration = () => {
  const dispatch = useTypedDispatch()
  const [addUser, { isLoading }] = useAdduserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IndividalMechant>({
    resolver: yupResolver(IndividualAuthSchema),
  })
  const onSubmit = handleSubmit(async (info) => {
    try {
      await addUser({ ...info, type: 'individual' }).unwrap()
      dispatch(openModal())
    }catch (err) {
      console.log(err)
      if ((err as AuthError).data?.errors) {
        for (const value of Object.values((err as AuthError).data?.errors)) {
          toast.error(value[0])
        }
      }
    }
  })
  return (
    <>
      <h1 className="font-poppins font-semibold leading-[60px] text-center text-[40px] text-bd-black">
        Create your Individual business account
      </h1>
      <span className="font-poppins text-gray-[200]  text-[18px] mb-4 mt-3  mx-auto py-2 leading-[27px] text-center">
        Kindly provide all the following details to help us set up your store.
      </span>
      <form onSubmit={onSubmit} className="flex flex-col  items-center">
        <div className="grid grid-cols-2 gap-x-6 w-full">
          <Input
            title="First Name"
            name="firstname"
            type="text"
            placeholder="enter first name"
            error={errors}
            register={register}
          />
          <Input
            title="Last Name"
            name="lastname"
            type="text"
            placeholder="enter last name"
            register={register}
            error={errors}
          />
        </div>
        <Input
          title="Email Address"
          name="email"
          type="email"
          placeholder="enter email address"
          register={register}
          error={errors}
        />
        <Input
          title="Phone Number"
          name="phone"
          type="text"
          placeholder="enter phone number"
          register={register}
          error={errors}
        />
        <Input
          title="Address"
          name="address"
          type="text"
          placeholder="enter address"
          register={register}
          error={errors}
        />
        <Input
          title="Password"
          name="password"
          type="password"
          placeholder="*********"
          register={register}
          error={errors}
        />

        <Input
          title="Confirm Password"
          name="confirm_password"
          type="password"
          placeholder="*********"
          register={register}
          error={errors}
        />

        <div className="flex items-end justify-end w-full mt-4">
          <Button
            title={isLoading ? 'Loading...' :  'Submit'}
            classNames="w-[205px] h-[50px] rounded-[50px]"
          />
        </div>
      </form>
    </>
  )
}

export default MechantIndividualRegistration
