import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('login');
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', author: '', description: '' });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setPosts([
      { id: '1', title: 'Primeiro Post', author: 'Gustavo', description: 'Descrição breve do post' },
      { id: '2', title: 'Segundo Post', author: 'Ana', description: 'Outro post interessante' },
    ]);

    setUsers([
      { id: '1', name: 'Professor Carlos', role: 'Professor' },
      { id: '2', name: 'Aluno João', role: 'Aluno' },
    ]);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView('posts');
  };

  const handleCreatePost = () => {
    if (newPost.title && newPost.author && newPost.description) {
      setPosts([...posts, { ...newPost, id: (posts.length + 1).toString() }]);
      setView('posts');
      setNewPost({ title: '', author: '', description: '' });
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  const handleViewChange = (newView) => setView(newView);

  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Bem-vindo ao BlogApp</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (view === 'posts') {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Posts Recentes</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar posts..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedPost(item)} style={styles.postCard}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postAuthor}>Por {item.author}</Text>
              <Text style={styles.postDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.primaryButton} onPress={() => setView('createPost')}>
          <Text style={styles.buttonText}>Criar Novo Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setView('admin')}>
          <Text style={styles.secondaryButtonText}>Ir para Administração</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (view === 'createPost') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Criar Novo Post</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={newPost.title}
          onChangeText={(text) => setNewPost({ ...newPost, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={newPost.author}
          onChangeText={(text) => setNewPost({ ...newPost, author: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={newPost.description}
          onChangeText={(text) => setNewPost({ ...newPost, description: text })}
        />
        <TouchableOpacity style={styles.primaryButton} onPress={handleCreatePost}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setView('posts')}>
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (view === 'admin') {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Administração</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userRole}>{item.role}</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setView('posts')}>
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (selectedPost) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{selectedPost.title}</Text>
        <Text style={styles.postDetailText}>Autor: {selectedPost.author}</Text>
        <Text style={styles.postDetailText}>{selectedPost.description}</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setSelectedPost(null)}>
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FA' },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  postTitle: { fontSize: 18, fontWeight: 'bold', color: '#34495E' },
  postAuthor: { fontSize: 14, color: '#7F8C8D', marginTop: 5 },
  postDescription: { fontSize: 14, color: '#95A5A6', marginTop: 5 },
  postDetailText: { fontSize: 16, marginVertical: 10, color: '#2C3E50' },
  primaryButton: {
    backgroundColor: '#2980B9',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButton: {
    backgroundColor: '#BDC3C7',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  secondaryButtonText: { color: '#2C3E50', fontSize: 16 },
  userCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#34495E' },
  userRole: { fontSize: 14, color: '#7F8C8D', marginBottom: 10 },
  editButton: { backgroundColor: '#27AE60', padding: 8, borderRadius: 5, marginBottom: 5 },
  editButtonText: { color: '#FFF', textAlign: 'center', fontSize: 14 },
  deleteButton: { backgroundColor: '#E74C3C', padding: 8, borderRadius: 5 },
  deleteButtonText: { color: '#FFF', textAlign: 'center', fontSize: 14 },
});
