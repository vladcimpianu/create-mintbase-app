import { useForm } from 'react-hook-form'
import { useWallet } from '../services/providers/MintbaseWalletContext'
import { MetadataField } from 'mintbase'

const Form = () => {
  const { wallet, isConnected, details } = useWallet()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  console.log({ isConnected })

  const onSubmit = async (data: {
    title: string
    description: string
    coverImage: any
  }) => {
    if (!isConnected) return
    if (!wallet) return

    const { data: didUpload, error } = await wallet.minter?.uploadField(
      MetadataField.Media,
      data.coverImage
    )

    if (!didUpload || error) {
      console.log(error)
    }

    wallet.minter?.setMetadata({
      title: data.title,
      description: data.description,
    })

    console.log(wallet.minter?.currentMint)

    wallet.mint(
      1,
      'vladc.mintspace2.testnet',
      { 'vladc.mintspace2.testnet': 10 },
      undefined,
      'vladc'
    )
  }

  return (
    <div className="w-full">
      <form className="bg-grey rounded px-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-8 mx-2">
          <label className="block text-grey-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            {...register('title', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Title"
          />
        </div>
        <div className="my-8 mx-2">
          <label className="block text-grey-700 text-sm font-bold mb-2">
            Description
          </label>
          <input
            {...register('description', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Description"
          />
        </div>

        <div className="my-8 mx-2">
          <label className="block text-grey-700 text-sm font-bold mb-2">
            Cover Image
          </label>
          <input
            {...register('coverImage', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
          />
        </div>

        <input
          className="w-full mx-2 bg-black text-white rounded shadow-2xl p-2 cursor-pointer"
          type="submit"
          value="Mint"
        />
      </form>
    </div>
  )
}

export default Form
