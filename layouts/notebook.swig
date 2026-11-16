{% extends '_layout.swig' %}
{% import '_macro/sidebar.swig' as sidebar_template with context %}

{% block title %}{{ page.title | escape }} | {{ title | escape }}{% endblock %}
{% block class %}notebook-page{% endblock %}

{% block content %}
  {% if not page.notebook %}
    <header class="notebook-intro">
      <div>
        <h1>笔记导航</h1>
        <p>按专题整理，随用随查。</p>
      </div>
      {% if theme.local_search.enable or theme.algolia_search.enable %}
        <button class="notebook-search popup-trigger" type="button"><i class="fa fa-search" aria-hidden="true"></i> 搜索笔记</button>
      {% endif %}
    </header>
    <div class="notebook-grid">
      {% for topic in page.notebooks %}
        <section class="notebook-card" aria-labelledby="topic-{{ topic.id }}">
          <div class="notebook-card-heading">
            <i class="{{ topic.icon }} notebook-icon" aria-hidden="true"></i>
            <h2 id="topic-{{ topic.id }}"><a href="{{ url_for(topic.path) }}">{{ topic.title | escape }}</a></h2>
            <span class="notebook-count">{{ topic.count }} 篇</span>
          </div>
          <p class="notebook-description">{{ topic.description | escape }}</p>
          <ul class="notebook-shortcuts">
            {% for section in topic.shortcuts %}
              <li><a href="{{ url_for(topic.path) }}#{{ section.id }}">{{ section.title | escape }}</a></li>
            {% endfor %}
          </ul>
          <a class="notebook-more" href="{{ url_for(topic.path) }}" aria-label="查看{{ topic.title | escape }}全部笔记">查看全部 <i class="fa fa-arrow-right" aria-hidden="true"></i></a>
        </section>
      {% endfor %}
    </div>
    <div class="notebook-bottom"><span>也可以按时间查找</span><a href="{{ url_for('posts/') }}">文章时间线 <i class="fa fa-arrow-right" aria-hidden="true"></i></a></div>
  {% else %}
    {% set topic = page.notebook %}
    <div class="notebook-topic">
      <header class="notebook-topic-header">
        <a class="notebook-back" href="{{ url_for('/') }}"><i class="fa fa-arrow-left" aria-hidden="true"></i> 笔记导航</a>
        <h1>{{ topic.title | escape }} <span class="notebook-count">{{ topic.count }} 篇笔记</span></h1>
        <p class="notebook-description">{{ topic.description | escape }}</p>
        <nav class="notebook-sections" aria-label="本专题小节">
          {% for section in topic.sections %}
            <a href="#{{ section.id }}">{{ section.title | escape }}</a>
          {% endfor %}
        </nav>
      </header>
      {% for section in topic.sections %}
        <section class="notebook-section" id="{{ section.id }}" aria-labelledby="heading-{{ section.id }}">
          <h2 id="heading-{{ section.id }}">{{ section.title | escape }} <span class="notebook-count">{{ section.posts.length }}</span></h2>
          <ul class="notebook-articles">
            {% for post in section.posts %}
              <li><a href="{{ url_for(post.path) }}"><span>{{ post.title | escape }}</span><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>
            {% endfor %}
          </ul>
        </section>
      {% endfor %}
      {% if not topic.count %}<p>这个专题还没有公开的笔记。</p>{% endif %}
    </div>
    <nav class="notebook-topic-switcher" aria-label="其他专题">
      {% for other in page.notebooks %}
        {% if other.id !== topic.id %}<a href="{{ url_for(other.path) }}">{{ other.title | escape }}</a>{% endif %}
      {% endfor %}
    </nav>
  {% endif %}
{% endblock %}

{% block sidebar %}{{ sidebar_template.render(false) }}{% endblock %}
