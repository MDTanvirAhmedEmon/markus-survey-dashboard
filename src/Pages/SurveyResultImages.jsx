import { Avatar } from "antd";
import { imageUrl } from "../redux/api/baseApi";
import { useGetAllSurveyCommentsQuery } from "../redux/features/survey/surveyApi";

const SurveyResultImages = ({ id }) => {
    const { data } = useGetAllSurveyCommentsQuery({
        id,
        page: 1,
        search: '',
    });

    return (
        <div className="flex -space-x-2">
            {data?.data?.map((item, index) => (
                <Avatar
                    className=" -ml-4"
                    key={index}
                    src={`${imageUrl}${item?.user?.image}`}
                    alt={`User ${index + 1}`}
                    size={45}  
                    shape="circle"  
                />
            ))}
        </div>
    );
};

export default SurveyResultImages;
