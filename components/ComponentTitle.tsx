interface ComponentTitleProps {
    title: string;
    justify: string;
}

const ComponentTitle: React.FC<ComponentTitleProps> = ({ title, justify }) => {
    return (
        <div className={`flex justify-${justify} w-full my-5 pl-5 items-baseline`}>
            <h2 className="componentTitle ">{title}</h2>
        </div>
    );
};

export default ComponentTitle;
