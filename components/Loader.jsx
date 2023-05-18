import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={600}
        height={200}
        viewBox="0 0 600 200"
        backgroundColor="#9e9e9e"
        foregroundColor="#cfcfcf"
        {...props}
    >
        <rect x="528" y="22" rx="3" ry="3" width="42" height="46" />
        <rect x="22" y="22" rx="3" ry="3" width="71" height="17" />
        <rect x="22" y="73" rx="3" ry="3" width="343" height="28" />
        <rect x="104" y="22" rx="3" ry="3" width="71" height="17" />
        <rect x="186" y="22" rx="3" ry="3" width="71" height="17" />
        <rect x="22" y="147" rx="3" ry="3" width="549" height="28" />
    </ContentLoader>
)

export default MyLoader