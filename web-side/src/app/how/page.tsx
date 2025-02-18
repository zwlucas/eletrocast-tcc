import { Header } from '@/app/components/Header'

export default function About() {
    return (
        <div className="min-h-screen bg-[#0e0e10] text-white">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Como</h1>
                <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, velit explicabo qui dolores accusantium aliquam soluta, quisquam, doloremque in harum consequuntur labore veritatis repudiandae quidem quaerat dicta nobis eveniet minus.
                </p>
                <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, velit explicabo qui dolores accusantium aliquam soluta, quisquam, doloremque in harum consequuntur labore veritatis repudiandae quidem quaerat dicta nobis eveniet minus.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, velit explicabo qui dolores accusantium aliquam soluta, quisquam, doloremque in harum consequuntur labore veritatis repudiandae quidem quaerat dicta nobis eveniet minus.
                </p>
            </main>
        </div>
    )
}