import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('login'); // Controla qual tela exibir: 'login', 'posts', 'admin', etc.
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', author: '', description: '' });
  const [users, setUsers] = useState([]); // Professores/Alunos

  useEffect(() => {
    // Simula a API de posts
    setPosts([
      { id: '1', title: 'Primeiro Post', author: 'Gustavo', description: 'Descrição breve do post' },
      { id: '2', title: 'Segundo Post', author: 'Ana', description: 'Outro post interessante' },
    ]);

    // Simula a API de usuários (professores e alunos)
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
        <Button title="Entrar" onPress={handleLogin} color="#6200EE" />
      </View>
    );
  }

  if (view === 'posts') {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Posts Recentes</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar posts..."
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedPost(item)} style={styles.postCard}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postAuthor}>Autor: {item.author}</Text>
              <Text style={styles.postDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
        <Button title="Criar Novo Post" onPress={() => setView('createPost')} />
        <Button title="Administração" onPress={() => setView('admin')} />
      </View>
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
        <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
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
      <View style={styles.container}>
        <Text style={styles.title}>Administração</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userRole}>{item.role}</Text>
              <Button title="Editar" onPress={() => alert('Editar Usuário')} />
              <Button title="Excluir" onPress={() => alert('Excluir Usuário')} color="red" />
            </View>
          )}
        />
        <Button title="Voltar" onPress={() => setView('posts')} />
      </View>
    );
  }

  if (selectedPost) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{selectedPost.title}</Text>
        <Text style={styles.detailText}>Autor: {selectedPost.author}</Text>
        <Text style={styles.detailText}>{selectedPost.description}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedPost(null)}>
          <Text style={styles.buttonText}>Voltar</Text>
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
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#6200EE', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
  searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 20 },
  postCard: { backgroundColor: '#FFF', padding: 15, marginBottom: 10, borderRadius: 8 },
  postTitle: { fontSize: 18, fontWeight: 'bold' },
  postAuthor: { fontSize: 14, color: '#555' },
  postDescription: { fontSize: 14, color: '#777' },
  button: { backgroundColor: '#6200EE', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 16 },
  secondaryButton: { backgroundColor: '#E0E0E0', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  secondaryButtonText: { color: '#333', fontSize: 16 },
  detailText: { fontSize: 16, marginBottom: 10 },
  userCard: { backgroundColor: '#FFF', padding: 10, borderRadius: 8, marginBottom: 10 },
  userName: { fontSize: 16, fontWeight: 'bold' },
  userRole: { fontSize: 14, color: '#555', marginBottom: 5 },
});
