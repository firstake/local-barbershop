import React, {Component} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPhone,
  faClock,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

const contacts = [
  {
    icon: faMapMarkerAlt,
    color: '#ffd75f',
    title: 'Address',
    text: `77
    Nowhere Avenue
    Planet Earth`,
    textTag: 'address',
  },
  {
    icon: faPhone,
    color: '#4ccc4c',
    title: 'Phone',
    text: '8-800-555-35-35',
    textTag: 'a',
    href: 'tel: 88005553535',
  },
  {
    icon: faClock,
    color: '#da9171',
    title: 'Hours',
    text: `We are now opened every day! From <time>10:00</time> to <time>18:00</time>`,
  },
  {
    icon: faEnvelope,
    color: '#98cdfb',
    title: 'Email',
    text: 'info@localbarbershop.com',
    textTag: 'a',
    href: 'mailto:info@localbarbershop.com',
  },
];

class Contacts extends Component {
  render() {
    return (
      <div className="container f-h py-4">
        <h1 className="text-center border-bottom pb-2">
          Contacts and location
        </h1>
        <div className="row">
          {contacts.map(({
            icon, color, title, text, textTag, href,
          }) => {
            const CustomTag = textTag || 'p';

            return (
              <div className="col-lg-3 col-sm-6" key={title}>
                <div
                  className="text-center border rounded d-flex
                    justify-content-center align-items-center mt-3"
                  style={{minHeight: 250}}
                >
                  <div className="px-3">
                    <FontAwesomeIcon
                      icon={icon}
                      style={{fontSize: 50, color}}
                      className="mb-2"
                    />
                    <h2>{title}</h2>
                    <CustomTag
                      className={`text-break text-pre-line mb-0${href ? ' text-inherit' : ''}`}
                      dangerouslySetInnerHTML={{__html: text}}
                      href={href || null}
                    />
                  </div>
                </div>
              </div>
            );
          },
          )}
        </div>
      </div>
    );
  }
}

export default Contacts;
