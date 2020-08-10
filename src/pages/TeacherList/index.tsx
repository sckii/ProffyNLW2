import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';


function TeacherList() {
  const [teachers, setTeachers] = useState([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [isFiltersVisible, setIsFilterVisible] = useState(false)

  const [subject, setSubject] = useState('')
  const [week_day, setWeek_day] = useState('')
  const [time, setTime] = useState('')

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id
        })

        setFavorites(favoritedTeachersIds)
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites()
  })

  async function handleFiltersSubmit() {
    loadFavorites()

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });
    console.log(response.data)
    setIsFilterVisible(false)
    setTeachers(response.data);
    
  }

  function handleTogglefilterVisibles() {
    setIsFilterVisible(!isFiltersVisible)
  }
  return (
    <View style={styles.container}>
      <PageHeader title="Profys Disponiveis" headerRight={(
        <BorderlessButton onPress={handleTogglefilterVisibles}>
          <Feather name="filter" size={20} color="#FFF" />
        </BorderlessButton>
      )} >
      { isFiltersVisible && (
        <View style={styles.searchForm}>
          <Text style={styles.label}>Matéria</Text>
          <TextInput
            placeholderTextColor='#c1bccc' 
            value={subject}
            onChangeText={text => setSubject(text)}
            style={styles.input}
            placeholder="Qual a matéria?"
          />

          <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Dia da semana</Text>
              <TextInput
                value={week_day}
                onChangeText={text => setWeek_day(text)}
                placeholderTextColor='#c1bccc' 
                style={styles.input}
                placeholder="Qual o dia?"
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Horario</Text>
              <TextInput
                value={time}
                onChangeText={text => setTime(text)}
                placeholderTextColor='#c1bccc' 
                style={styles.input}
                placeholder="Qual o horario?"
              />
            </View>
          </View>

          <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
             <Text style={styles.submitButtonText}>Filtrar</Text>
          </RectButton>
        
        </View>
      )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={
          {
            paddingHorizontal: 16,
            paddingBottom: 16
          }
        }
      >
        {teachers.map((teacher: Teacher) => 
        <TeacherItem 
          key={teacher.id} 
          teacher={teacher}  
          favorited={favorites.includes(teacher.id)}
        /> 
        )}
      </ScrollView>
    </View>
  )
}

export default TeacherList;