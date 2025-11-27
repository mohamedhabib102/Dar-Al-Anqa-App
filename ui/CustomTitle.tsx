import { useLocale } from "next-intl";


interface Title {
    title: string;
    description?: string;
    success: boolean;
}

const CustomTitle: React.FC<Title> = ({ title, description, success }) => {
    const locale = useLocale();
    return (
        <div className={`
        ${locale === "ar" ? "text-right" : "text-left"}
        mb-7
        `}>
            <h2 className="text-(--main-color) mb-1 font-semibold text-lg">{title}</h2>
            <p className={`text-[21px] text-gray-700  ${success ? locale === "ar" ? "lg:w-[460px] ml-auto" : "lg:w-[460px] mr-auto" : ""}`}>{description}</p>
        </div>
    )
};
export default CustomTitle;
