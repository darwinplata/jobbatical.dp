
/**
 * Componente que contiene el formulario de creacion de Habilidades
 * y la lista de habilidades creadas
 */
import React, { Component } from 'react';
import SkillsList from './SkillsList';//Componente de la lista de habilidades
import SkillsForm from './SkillsForm';//Componente de creacion de habilidades

class App extends Component {
  state = {
    skillsAdded : 0 
  }
  
  //Actualizar lista de habilidades despues de crear una nueva
  updateListSkills(){
    this.setState({skillsAdded: this.state.skillsAdded + 1})
  }

  render() {
    return (
      <content>
        <h1 className="title_page">add your skills</h1>  
        <SkillsForm updateList={this.updateListSkills.bind(this)}/>
        <SkillsList newSkill={this.state.skillsAdded} />
      </content>
    );
  }
}

export default App;
