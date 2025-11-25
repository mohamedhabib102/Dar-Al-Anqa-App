

interface Title {
    title: string;
    description?: string;
    success: boolean;
}

const CustomTitle: React.FC<Title> = ({ title, description, success }) => {
    return (
        <div className="text-right mb-7">
            <h2 className="text-(--main-color) mb-1 font-semibold text-lg">{title}</h2>
            <p className={`text-[21px] text-gray-700  ${success ? "lg:w-[460px] ml-auto" : ""}`}>{description}</p>
        </div>
    )
};
export default CustomTitle;
