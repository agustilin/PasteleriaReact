import { BiBookContent, BiComment } from "react-icons/bi"
import { FcSupport } from "react-icons/fc"
import { MdLocalShipping } from "react-icons/md"


export const FeatureGrid = () => {
    return (
        <div className='grid grid-cols-2 gap-8 mt-6 mb-16 lg:grid-cols-4 lg:gap-5'>
            <div className="flex items-center gap-6">
                <MdLocalShipping size={40} className='text-slate-600'/>

                <div className='space-y-1'>
                    <p className='font-semibold'>Sin cobro de envio</p>
                    <p className="text-sm">a toda la region</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <BiComment size={40}  className='text-slate-600'/>

                <div className='space-y-1'>
                    <p className='font-semibold'>Calificanos</p>
                    <p className="text-sm">Queremos saber tu opinion</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <FcSupport size={40} className='text-slate-600'/>

                <div className='space-y-1'>
                    <p className='font-semibold'>Soporte</p>
                    <p className="text-sm">¿necesitas ayuda?</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <BiBookContent size={40} className='text-slate-600'/>
                
                <div className='space-y-1'>
                    <p className='font-semibold'>Nosotros</p>
                    <p className="text-sm">Conoce nuestra historia</p>
                </div>
            </div>
        </div>
    )
}

