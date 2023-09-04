import Image from 'next/image';
import { Bars3Icon , MagnifyingGlassIcon, ShoppingCartIcon, } from '@heroicons/react/24/outline';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'

const Header = () => {

    const {data: session} = useSession();
    const router = useRouter()

  return (
    <header>
    {/* top */}
    <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
<div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
    <Image onClick = {() => router.push('/')}
        src="/images/amazon-logo.jpg"
        
        // https://links.papareact.com/f90
        width={90}
        height={40}
        style={{objectFit:"contain"}}
        className='cursor-pointer'
    />
    <p className='hidden sm:inline text-white items-center pb-3 pr-2'>.co.uk</p>
</div>

{/* Search */}
<div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
<input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' type="text" />
<MagnifyingGlassIcon className='h-12 p-4'/>
</div>

{/* right */}
<div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
    <div className='link' onClick={() => !session ? signIn() : signOut()}>
    <p>{session ? `Hello, ${session.user.name}` : 'SignIn'}</p>
    <p className='font-extrabold md:text-sm'>Account & Lists</p>
    </div>
    <div className='link'>
        <p>Returns</p>
        <p className='font-extrabold md:text-sm'>& Orders</p>
    </div>
    <div className='relative link flex items-center' onClick = {() => router.push('/checkout')}>
    <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black'>0</span>
        <ShoppingCartIcon className='h-10'/>
        <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
    </div>

</div>

    </div>

    {/* bottom */}
    <div className='space-x-3 p-2 pl-6 flex items-center bg-amazon_blue-light text-white text-sm'>
<p className='link flex items-center'>
    <Bars3Icon  className='h-6 mr-1'/>
All
</p>
<p className='link'>Prime Video</p>
<p className='link'>Amazon Business</p>
<p className='link'>Today's Deals</p>
<p className='link hidden lg:inline-flex'>Electronics</p>
<p className='link hidden lg:inline-flex'>Food & Grocery</p>
<p className='link hidden lg:inline-flex'>Prime</p>
<p className='link hidden lg:inline-flex'>Buy Again</p>
<p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
<p className='link hidden lg:inline-flex'>Health & Personal Care</p>
    </div>
    </header>
  )
}

export default Header