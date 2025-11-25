
const Login: React.FC = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-[url('/images/bg-auth.jpg')] bg-cover bg-center relative">
         
            <div className="absolute inset-0 bg-black/30"></div>

            <form className="relative z-10 flex flex-col gap-6 bg-black/30 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-[93%] md:w-[460px] border border-white/10">
                <div className="text-center mb-2">
                    <h2 className="text-3xl font-bold text-white mb-2">مرحباً بك مجدداً</h2>
                    <p className="text-gray-300 text-sm">سجل دخولك للمتابعة في دار العنقاء</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-200 text-sm font-medium"> الأسم  </label>
                        <input
                            type="text"
                            name="name"
                            placeholder=" محمد "
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-(--main-color) focus:ring-1 focus:ring-(--main-color) transition-all duration-300"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-200 text-sm font-medium">رقم الهاتف</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="+201234567890"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-(--main-color) focus:ring-1 focus:ring-(--main-color) transition-all duration-300"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-200 text-sm font-medium">كلمة المرور</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-(--main-color) focus:ring-1 focus:ring-(--main-color) transition-all duration-300"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-200 text-sm font-medium">نوع الحساب</label>
                        <select 
                    name="role" 
                    id="role"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-(--main-color) focus:ring-1 focus:ring-(--main-color) transition-all duration-300"
                    >
                        <option className="text-gray-400" value="user"> مستخدم </option>
                        <option className="text-gray-400" value="author"> مؤلف </option>
                        <option className="text-gray-400" value="publishhouse"> دار نشر </option>
                    </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="cursor-pointer mt-2 w-full bg-(--main-color) text-white font-bold py-3.5 rounded-lg hover:bg-[#a08b21] transition-all duration-300 shadow-lg hover:shadow-(--main-color)/20 active:scale-95"
                >
                    تسجيل الدخول
                </button>
            </form>
        </section>
    )
}
export default Login;