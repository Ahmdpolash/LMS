type TProps = {
  groupedData: { [key: string]: any[] };
  sectionOrder: string[];
  allContent: any[];
  activeVideo: number;
  setActiveVideo: (activevideo: number) => void;
};

const ModuleSidebar = ({
  groupedData,
  sectionOrder,
  allContent,
  activeVideo,
  setActiveVideo,
}: TProps) => {
  return (
    <div>
      {sectionOrder.map((sectionName) => (
        <div key={sectionName}>
          <h3>{sectionName}</h3>
          <ul>
            {groupedData[sectionName]?.map((video: any) => (
              <li key={video._id}>{video.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ModuleSidebar;
