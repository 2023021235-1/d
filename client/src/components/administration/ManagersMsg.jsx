import React from 'react';
import './styles/ManagersMsg.css';
import p2 from "../images/p2.webp"
const ManagersMsg = () => {
  return (
    <div className="page_content">
      <h2 className="manager-title">Manager’s Message</h2>

      <div className="manager-message-container">
        <img
          src={p2}
          alt="Manager"
          className="manager-image"
        />

        <div className="manager-content">
          <p>
            राष्ट्रीय शिक्षा नीति के द्वारा शिक्षा रचनात्मक क्रान्ति के दौर से गुजर रही है। शिक्षण के तरीकों में बदलाव आए हैं।
          </p>
          <p>
            डी०ए०वी० पी०जी० कॉलेज, गोरखपुर अपने प्रगतिशील विचारों के साथ नवीन शिक्षण विधियों के अनुरूप विद्यार्थियों को संवारना और उन्हें भविष्य की चुनौतियों का सामना करने में सक्षम बना रही है।
          </p>
          <p>
            पूर्वांचल के सुदूर ग्रामीण क्षेत्रों के साथ-साथ सीमावर्ती नेपाल व बिहार के विद्यार्थी भी संस्था से शिक्षा प्राप्त कर देश व विदेश में अपनी पहचान बना रहे हैं।
          </p>
          <p>
            महाविद्यालय परिवार उच्चतर जीवन मूल्यों के संवर्धन के लिए संकल्पित है।
          </p>
          <div className="manager-signature">रणवीर शंकर</div>
        </div>
      </div>
    </div>
  );
};

export default ManagersMsg;
