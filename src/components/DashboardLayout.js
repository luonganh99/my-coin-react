const DashboardLayout = ({ children }) => {
    return (
        <>
            <header>This is header</header>
            <div className='container'>{children}</div>
        </>
    );
};

export default DashboardLayout;