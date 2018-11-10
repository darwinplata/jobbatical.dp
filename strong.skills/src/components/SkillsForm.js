
/**
 * Skill Creation Component
 */
import React, { Component } from 'react';
import { SaveSkill } from '../api/skills';

class SkillSForm extends Component {

    // Save Skill in json-server
    async handleSubmit(e){
        e.preventDefault()
        let inputName = document.querySelector('#name').value
        let inputExperience = document.querySelector('#experience').value
        const skill = {
            name: inputName,
            experience: inputExperience
        }
        console.log(skill)

        await SaveSkill(skill)
        this.props.updateList()
        
        inputName = ""
        inputExperience = ""
    }

    // Rendering of the form view
    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="row">
                    <div className="col-lg-5 col-md-12 col-12">
                        <div className="form-group">
                            <input type="text" className="form-control custom-input" id="name"  placeholder="Node JS, Postgres, React, etc.," required="true" minLength="4" maxLength="255" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-6">
                        <div className="form-group">
                            <select className="form-control custom-select" id="experience" required="true">
                                <option value="">Experience</option>
                                <option value="&#60; 1 year">&#60; 1 year</option>
                                <option value="1 - 3 years">1 - 3 years</option>
                                <option value="3 - 5 years">3 - 5 years</option>
                                <option value="5 - 7 years">5 - 7 years</option>
                                <option value="7+ years">7+ years</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6">
                        <button type="submit" className="btn btn-custom">Add Skill</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default SkillSForm;