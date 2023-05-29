
import Head from "next/head"
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import Sidebar from "../components/Sidebar"
import Pasos from "../components/Pasos"
import ModalProducto from "../components/ModalProducto";
import useQuiosco from "../hooks/useQuiosco";

import 'react-toastify/dist/ReactToastify.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement("#__next");

export default function Layout({children, pagina}) {

  const {modal} = useQuiosco()

    return (
      <>
        <Head>
            <title>Fresh Coffee - {pagina}</title>
            <meta name="description" content="Quiosco Cafetería"/>
        </Head>

        <div className="md:flex">

            <aside className="md:w-4/12 xl:w.1/4 2xl:w-1/5">
                <Sidebar/>
            </aside>

            <main className="md:w-8/12 xl:w.3/4 2xl:w-4/5 screen overflow-y-scroll">
                <div className="p-10">
                  <Pasos/>
                  {children}
                </div>
            </main>

        </div>

        {/* {modal && ( */}
          <Modal
            isOpen={modal}
            style={customStyles}
          >
            <ModalProducto />
          </Modal>  
        {/* )}  */}

        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      </>
    )
  }

  // * USAREMOS PARA EL MODAL UNA DEPENDENCIA DE REACT, REACT-MODAL
  //-Importamos el componente en la parte superior, agregamos el customStyle y, agregamos en el contenido
  // * Para el TOAST usaremos una depenencia de React, React-Toastify 
  //-Importamos el componente y tambien su hoja de estilos y lo agregamos en el contenido para que se muestre