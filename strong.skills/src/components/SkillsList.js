
/**
 * Component showing the list of skills
 */

import React, { Component } from 'react';
import { AllSkills, DeleteSkill } from '../api/skills';

class SkillsList extends Component {

    state = {
        skills : []
    }

    async componentDidMount(){
        await this._loadSkills()
    }

    // Remove a specific skill
    async deleteSkill(skill){
        await DeleteSkill(skill.id)
        await this._loadSkills()
    }

    // Get all API skills
    async _loadSkills(){
        const skills = await AllSkills()
        this.setState({skills: skills.data }) 
    }

    componentWillReceiveProps(){
        this._loadSkills()
    }

    // Creation of skills arrangement
    _renderList(){
        return this.state.skills.map(( skill, index ) => {
            return <ItemsSkills 
                        key={skill.id} 
                        skill={{...skill, index: index + 1 }}
                        remove={this.deleteSkill.bind(this)} 
                    />;
        })
    }

    
    // Rendering of the skills list 
    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <ul className="listSkills">
                        {this._renderList()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default SkillsList;

/**
 * Component that builds each skill
 */
class ItemsSkills extends Component{
    render(){
        let { skill, remove } = this.props
        return (
            <li className="skillItem">
                <h5>{skill.name}</h5>
                <span className="timeSkill">{skill.experience}</span>
                <div className="sticker">{skill.index}</div>
                <button className="buttonDeleteSkill"  onClick={()=> remove(skill)}>
                    <i className="fas fa-times"></i>
                </button>
            </li>
        )
    }
}
