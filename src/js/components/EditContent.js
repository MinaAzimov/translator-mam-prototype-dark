import React, { Component, PropTypes } from 'react';

import Chat from './Chat';
import BaseLayout from './BaseLayout';
import Field from './Field';
import TaskList from './TaskList';
import TaskCreator from './TaskCreator';
import SelectRepeater from './form/SelectRepeater';
import Selectbox from './form/Selectbox';
import TextArea from './form/TextArea';
import FieldWidgets from './form/FieldWidgets';
import EditPageHeader from './EditPageHeader';
import RTEditor from './RTEditor';
import MediaCard from './MediaCard';
import Switch from './form/Switch';
import SocialMediaPreview from './SocialMediaPreview';
import PageTitle from './PageTitle';

import { Card, CardSection, CardBoard } from './Card';
import { connect } from 'react-redux';
import MediaEditOverlay from './MediaEditOverlay';
import MediaLicensePrompt from './MediaLicensePrompt';

import classNames from "classnames";
import { getContentItems } from "../services/content";
import { getUserData } from "../services/users";
import TagsInput from "./form/TagsInput";

import $ from "jquery";

const teams = [
  {
    id: 0,
    title: "CNBC US Team"
  },
  {
    id: 1,
    title: "CNBC Europe Team"
  },
  {
    id: 2,
    title: "CNBC Asia Team"
  }
]


const projects = [
  {
    id: 0,
    title: "Data stories"
  },
  {
    id: 1,
    title: "Pisani explained"
  },
  {
    id: 2,
    title: "Research desk project"
  },
  {
    id: 3,
    title: "Pro uncut project"
  },
  {
    id: 4,
    title: "Analyst note project"
  },
  {
    id: 5,
    title: "Santali column project"
  },
  {
    id: 6,
    title: "Pro Strategy Project"
  },
  {
    id: 7,
    title: "Santelli Extra Project"
  },
  {
    id: 8,
    title: "CNBC Pro Talks project"
  },
  {
    id: 9,
    title: "Project Unity"
  }
]

const allItems = getContentItems();
const franchiseItems = getContentItems("franchise");
const templateItems = getContentItems("template");
const skinItems = getContentItems("skin");
const sourceItems = getContentItems("source");

const primaryAssetTypes = [
 "franchise", "person", "company", "security", "place"
]

const primaryAssetItems = allItems.filter(item => {
  return primaryAssetTypes.indexOf(item.type) !== -1;
});

class EditContent extends Component {

  componentDidMount() {
    // This code should eventually be replaced
    $('.favorite-page').click( function() {
      $(this).toggleClass("active");
    });
  }



  render() {
    const { fields, lockedBy, client } = this.props;
    const classnames = classNames({
      'edit-content': true,
      'page-wrapper': true,
      'edit-content--locked': lockedBy !== null
    })

    const lockerEditor = lockedBy !== null ? getUserData(this.props.lockedBy) : null;

    return (
      <div className={classnames}>
        <BaseLayout fields={fields} pageTitle="New article">
          {
            lockerEditor && lockerEditor.id !== client.user.id ?
              <div className="edit-content__locked-overlay">
                <div className="edit-content__locked-overlay-msg">
                  <i className="fa fa-lock"></i>Editing has been locked by { lockerEditor.name }
                </div>
              </div>
            :
              null
          }
          <EditPageHeader />
          <div className="page-title__wrapper">
            <Field field={fields[0]}>
              <PageTitle characterLimit={60} />
            </Field>
            <div className="favorite-container">
              <div className="favorite-page">
                <i className="iconcss icon-star" />
                <div className="favorite-tooltip">Add to Favorites</div>
              </div>
              <div className="favorite-page">
                <i className="iconcss icon-flag" />
                <div className="favorite-tooltip">Add to Status Tracker</div>
              </div>
              <div className="favorite-page">
                <i className="iconcss icon-chart" />
                <div className="favorite-tooltip">Add to Article Statistics</div>
              </div>
            </div>
          </div>
          <Chat />
          <div className="centered">
            <CardBoard>
              <Card title="Body" size="lg" id="body">
                <CardSection>
                  <RTEditor fieldId={14} />
                </CardSection>
              </Card>
              <Card title="General info" id="general">
                <CardSection>
                  <Field field={fields[0]}>
                    <FieldWidgets.Text characterLimit={60}/>
                  </Field>
                  <Field field={fields[1]}>
                    <FieldWidgets.Text />
                  </Field>
                  <Field field={fields[2]}>
                    <FieldWidgets.Text />
                  </Field>
                  <Field field={fields[3]}>
                    <FieldWidgets.Text characterLimit={80} />
                  </Field>
                  <Field field={fields[37]}>
                    <Selectbox
                      helpText="" 
                      label="Content item" 
                      items={sourceItems}
                      search={true}
                      allowCustomText={false}
                      showComplex={true}
                      inputPlaceholder="Type source"/>
                  </Field>

                  {/*<Field field={fields[4]}>
                    <FieldWidgets.Text characterLimit={39} />
                  </Field>
                  <Field field={fields[5]}>
                    <FieldWidgets.Text characterLimit={30} />
                  </Field>*/}
                </CardSection>
              </Card>
              <Card title="Social media" id="social-media">
                <CardSection title="Twitter">
                  <Field field={fields[34]}>
                    <FieldWidgets.Text characterLimit={140}  />
                  </Field>
                  <Field field={fields[35]}>
                    <FieldWidgets.Text characterLimit={60} />
                  </Field>
                  <Field field={fields[36]}>
                    <FieldWidgets.Text characterLimit={150} />
                  </Field>
                  <SocialMediaPreview type="twitter" post={fields[34].value} ogTitle={fields[35].value} ogDescription={fields[36].value} />
                </CardSection>
                {/*
                <CardSection title="Facebook">
                  <Field field={fields[35]}>
                    <FieldWidgets.Text />
                  </Field>
                  <SocialMediaPreview type="facebook" title={fields[35].value}/>
                </CardSection>
                <CardSection title="LinkedIn">
                  <Field field={fields[36]}>
                    <FieldWidgets.Text />
                  </Field>
                  <SocialMediaPreview type="linkedin" title={fields[36].value}/>
                </CardSection>
              */}
              </Card>

              
              <Card title="Media" id="media">
                <CardSection className="card-section--media">
                    <Field field={fields[16]}>
                      <MediaCard />
                    </Field>
                    <Field field={fields[15]}>
                      <MediaLicensePrompt />
                    </Field>
                </CardSection>
              </Card>

              <Card title="SEO & Promo" id="seo">
                <CardSection>
                  <Field field={fields[6]}>
                    <FieldWidgets.Text characterLimit={50} />
                  </Field>
                  <Field field={fields[38]}>
                    <FieldWidgets.Text characterLimit={150} />
                  </Field>           
                  <div className="field-blurb">
                    <span>http://cnbc.com/2017/01/25/</span>
                    <span>{ fields[38].value }</span>
                  </div>       
                  <Field field={fields[7]}>
                    <FieldWidgets.Text characterLimit={150} />
                  </Field>

                  {/*<Field field={fields[8]}>
                    <FieldWidgets.Text characterLimit={150} />
                  </Field>
                  <Field field={fields[9]}>
                    <FieldWidgets.Text characterLimit={120} />
                  </Field>*/}
                  <Field field={fields[10]}>
                    <TagsInput options={['Donald Trump', 'Donald Rumsfeld', 'Janet Yellen', 'U.S. Congress']} />
                  </Field>
                </CardSection>
              </Card>
              <Card title="Tagging" id="association">
                <CardSection title="Section">
                  <Field field={fields[11]}>
                    <Selectbox
                      helpText=""
                      label="Section"
                      items={franchiseItems}
                      search={true}
                      allowCustomText={false}
                      search={true}
                      showComplex={true}
                      helpText=""
                      inputPlaceholder="Type the title of the section"/>
                  </Field>
                </CardSection>
                <CardSection title="Categories">
                  <Field field={fields[12]}>
                    <SelectRepeater items={primaryAssetItems}  />
                  </Field>
                </CardSection>
                <CardSection title="Related Content">
                  <Field field={fields[13]}>
                    <SelectRepeater items={allItems}/>
                  </Field>
                </CardSection>
              </Card>
              <Card title="Tasks" id="tasks">
                <CardSection>
                  <TaskList />
                </CardSection>
              </Card>
              <Card title="Team and Project" id="team">
                <CardSection>
                  <Field field={fields[22]}>
                    <Selectbox
                      helpText=""
                      label="Team"
                      items={teams}
                      search={true}
                      allowCustomText={false}
                      search={true}
                      showComplex={false}
                      inputPlaceholder="Start typing the name of the team"/>
                  </Field>
                  <Field field={fields[23]}>
                    <Selectbox
                      helpText=""
                      label="Project"
                      items={projects}
                      search={true}
                      allowCustomText={false}
                      search={true}
                      showComplex={false}
                      inputPlaceholder="Start typing the name of the project"/>
                  </Field>
                </CardSection>
              </Card>
              <Card title="Configuration" id="configuration">
                <div className="settings-container">
                  <CardSection title="Settings">
                    <Field field={fields[17]}>
                      <Switch/>
                    </Field>
                    <Field field={fields[18]}>
                      <Switch/>
                    </Field>
                    <Field field={fields[19]}>
                      <Switch/>
                    </Field>
                    <Field field={fields[20]}>
                      <Switch/>
                    </Field>
                    <Field field={fields[21]}>
                      <Switch/>
                    </Field>
                  </CardSection>
                  <CardSection title="Configuration">
                    <Field field={fields[24]}>
                      <Switch/>
                    </Field>
                    <Field field={fields[25]}>
                      <Switch/>
                    </Field>
                    <Field field={fields[26]}>
                      <Switch/>
                    </Field>
                    <Field field={fields[27]}>
                      <Switch/>
                    </Field>
                    <Field field={fields[28]}>
                      <Selectbox
                        helpText=""
                        items={templateItems}
                        search={true}
                        allowCustomText={false}
                        search={true}
                        showComplex={true}
                        inputPlaceholder="Start typing the name of the template"/>
                    </Field>
                    <Field field={fields[29]}>
                      <Selectbox
                        helpText=""
                        items={skinItems}
                        search={true}
                        allowCustomText={false}
                        search={true}
                        showComplex={true}
                        inputPlaceholder="Start typing the name of the skin"/>
                    </Field>
                  </CardSection>
                </div>
              </Card>
              <Card title="Internal notes" id="internal-notes">
                <CardSection>
                  <Field field={fields[39]}>
                    <TextArea
                      helpText=""
                      items={skinItems}
                      search={true}
                      allowCustomText={false}
                      search={true}
                      showComplex={true}
                      placeholder="Start typing..."/>
                  </Field>
                </CardSection>
              </Card>


            </CardBoard>
          </div>
        </BaseLayout>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fields: state.fields,
    lockedBy: state.contentItem.lockedBy,
    client: state.client
  }
}

export default connect(mapStateToProps)(EditContent);
