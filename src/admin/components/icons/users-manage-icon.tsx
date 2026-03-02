const SvgUsersManageIcon = ({ className = '' }: { className?: string }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M2 20c0-4 3.134-7 7-7s7 3 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M18 11v6M15 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export default SvgUsersManageIcon;
