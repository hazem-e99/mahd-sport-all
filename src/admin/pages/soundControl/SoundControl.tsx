import { useState } from "react";
import PageHeaderActions from "../cardControl/components/common/pageHeaderActions/pageheader-actions.component";
import { useLanguage } from "../../context/languageContext";
import UploadModal from "@admin/pages/cardControl/pages/UploadModal/UploadModal";
import { Button } from "react-bootstrap";
import { AudioDashIcon } from "@admin/components/icons";

const SoundControl = () => {
    const { getValue } = useLanguage();
    const [showUploadModal, setShowUploadModal] = useState(false);

    return (
        <>
            <PageHeaderActions
                title={getValue("sound_controller") || "Sound Controller"}
                showBtns={false}
                breadcrumb={
                    <ul className="menu-breadcrumb">
                        <li>{getValue("home")}</li>
                        <li>-</li>
                        <li>{getValue("sound_controller")}</li>
                    </ul>
                }
            />

            <div className="sound-control-page mt-4">
                <div className="card bg-white border-0 rounded-3 p-5 text-center">
                    <div className="d-flex flex-column align-items-center gap-4">
                        <div
                            style={{
                                background: "#773dbd",
                                width: "80px",
                                height: "80px",
                                borderRadius: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white"
                            }}
                        >
                            <AudioDashIcon style={{ width: "40px", height: "40px" }} />
                        </div>
                        <div>
                            <h3>{getValue("sound_controller") || "Sound Controller"}</h3>
                            <p className="text-muted">
                                {getValue("manage_sounds_desc") || "Upload and manage your system sound files here."}
                            </p>
                        </div>
                        <Button
                            className="main-button active px-5"
                            onClick={() => setShowUploadModal(true)}
                        >
                            {getValue("upload_sound") || "Upload Sound"}
                        </Button>
                        <div className='home-card-container__body__button mt-3' style={{ cursor: 'pointer', color: '#773dbd', fontWeight: 500 }} onClick={() => setShowUploadModal(true)}>
                            <span className='home-card-container__body__button-text'>{getValue("view_details") || 'View Details'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <UploadModal
                show={showUploadModal}
                handleClose={() => setShowUploadModal(false)}
                setFileName={() => { }}
                setValue={() => { }}
                clearErrors={() => { }}
                trigger={async () => true}
                name="sound_file"
                accept=".mp3,audio/mpeg"
            />
        </>
    );
};

export default SoundControl;
