import React from "react";

import "./negociate.css";

function Negociate() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    mobileBrand: "",
    mobileModel: "",
    problemDescription: "",
    issueType: "",
    urgencyLevel: "",
    repairType: "",
    serviceType: "",
    image: null,
  });

  function handleSubmit() {
    alert("The form submitted!!");

    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      mobileBrand: "",
      mobileModel: "",
      problemDescription: "",
      issueType: "",
      urgencyLevel: "",
      repairType: "",
      serviceType: "",
      image: null,
    });
  }

  return (
    <>
      {/* div that hold overall elements  */}
      <div className="negociate-main">
        {/* holds all form element  */}
        <div className="negociate-user-form">
          <div className="main-heading">
            <p className="main-heading">
              Feel Comfortable to share your damage...!!!
            </p>
          </div>
          {/* hold user form  */}
          <div className="user-form">
            <div className="fullname">
              <label htmlFor="firstName">First Name</label>
              <input
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                id="firstName"
                type="text"
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                id="lastName"
                type="text"
              />
            </div>
            <div className="phoneNumber">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                id="phoneNumber"
                type="text"
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                id="email"
                type="email"
              />
            </div>
            <div className="mobile-brand">
              <label htmlFor="iphone">Iphone</label>
              <input
                id="iphone"
                name="mobileBrand"
                value="iphone"
                checked={formData.mobileBrand === "iphone"}
                onChange={(e) =>
                  setFormData({ ...formData, mobileBrand: e.target.value })
                }
                type="radio"
              />
              <label htmlFor="samsung">Samsung</label>
              <input
                id="samsung"
                value="samsung"
                checked={formData.mobileBrand === "samsung"}
                onChange={(e) =>
                  setFormData({ ...formData, mobileBrand: e.target.value })
                }
                name="mobileBrand"
                type="radio"
              />
              <label htmlFor="xiaomi">Xiaomi</label>
              <input
                id="xiaomi"
                name="mobileBrand"
                value="xiaomi"
                checked={formData.mobileBrand === "xiaomi"}
                onChange={(e) =>
                  setFormData({ ...formData, mobileBrand: e.target.value })
                }
                type="radio"
              />
              <label htmlFor="other">Other</label>
              <input
                id="other"
                name="mobileBrand"
                value="other"
                checked={formData.mobileBrand === "other"}
                onChange={(e) =>
                  setFormData({ ...formData, mobileBrand: e.target.value })
                }
                type="radio"
              />
            </div>
            <div className="mobile-model-input">
              <label htmlFor="mobileModel">Enter your Phone Model</label>
              <input
                type="text"
                value={formData.mobileModel}
                onChange={(e) =>
                  setFormData({ ...formData, mobileModel: e.target.value })
                }
              />
            </div>
            <div className="problem-description-input">
              <label htmlFor="problemDescription">Describe the problem</label>
              <input
                id="problemDescription"
                type="text"
                value={formData.problemDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    problemDescription: e.target.value,
                  })
                }
              />
            </div>
          </div>
          {/* ===========  */}
          <div className="negociate-issue-container">
            <label style={{ margin: "10px" }} htmlFor="">
              Enter Your Damage Type
            </label>
            <select
              name="issueType"
              id="issueType"
              value={formData.issueType}
              onChange={(e) =>
                setFormData({ ...formData, issueType: e.target.value })
              }
            >
              <option value="">-- select --</option>
              <option value="screen">Screen Damage</option>
              <option value="battery">Battery Issue</option>
              <option value="charging">Charging Problem</option>
              <option value="network">Network / Signal Issue</option>
              <option value="water">Water Damage</option>
              <option value="speaker">Speaker / Mic Issue</option>
              <option value="camera">Camera Issue</option>
              <option value="software">Software Issue</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* =============  */}
          <div className="negociate-image-container">
            <p className="negociate-image-container-heading">
              Add Image of Your Damaged Device
            </p>
            <div className="image-holder">
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
            </div>
          </div>
          {/* ================ */}

          <div className="negociate-user-urgency-level">
            <div className="urgency-selection">
              <div className="urgency-level-note">
                <ul>
                  <li>
                    Normal Urgency level refers for 1 - 2 days of fixing time.
                  </li>
                  <li>
                    Urgent level refers the repairing damage within same day.
                    This is slightly costly than normal repairing.
                  </li>
                  <li>
                    Emergency level refers the repairing the damage within an
                    hours. This may be more costy.
                  </li>
                </ul>
              </div>
              <label htmlFor="repairType">Enter Your Repair Type</label>
              <select
                name="repairType"
                id="repairType"
                value={formData.repairType}
                onChange={(e) =>
                  setFormData({ ...formData, repairType: e.target.value })
                }
              >
                <option value="">-- select --</option>
                <option value="normal">Normal Repair</option>
                <option value="urgent">Urgent Repair</option>
                <option value="emergency">Emergency Repair</option>
              </select>
            </div>
          </div>
          {/* ================= */}
          <div className="negociate-message-from-admin"></div>
          {/* =================  */}
          <div className="negociate-service-type">
            <label htmlFor="serviceType">
              Select Your repair Spot Preference
            </label>
            <select
              name="serviceType"
              id="serviceType"
              value={formData.serviceType}
              onChange={(e) =>
                setFormData({ ...formData, serviceType: e.target.value })
              }
            >
              <option value="">-- select --</option>
              <option value="visit">🏪 I will visit the shop</option>
              <option value="pickup">🚚 Please arrange pickup</option>
            </select>
          </div>
          <div className="negociate-control-buttons">
            <div className="button-for-cancle">
              <button type="button">Cancel</button>
            </div>
            <div className="button-for-confirm">
              <button type="button" onClick={handleSubmit}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Negociate;
